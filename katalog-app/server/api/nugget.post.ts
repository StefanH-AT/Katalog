import fs from "fs/promises";
import path from "node:path";
import {mkdir} from "node:fs/promises";
import {nuggetMaxImageFileSize} from "~/shared/nugget/NuggetUploadLimits";
import {NuggetUploadFailureReasons, NuggetUploadResponse, NuggetUploadResponseStatuses} from "~/shared/nugget/NuggetUploadResponse";
import {createNuggetId, getNuggetDirectory} from "~/server/utils/nugget";
import {protectEndpoint} from "~/server/utils/EndpointProtection";
import {NuggetMetaData} from "#shared/nugget/NuggetMetaData";

export default defineEventHandler(async (event) => {
    const session = await protectEndpoint(event);

    const multiPartData = await readMultipartFormData(event);
    if(!multiPartData) {
        throw createError({
            statusCode: 400,
            statusMessage: "Multi part form data is empty",
        });
    }

    const responses: NuggetUploadResponse[] = [];

    const promises: Promise<{ index: number, fileName: string, nuggetId: string }>[] = [];

    for (let i = 0; i < multiPartData.length; i++){
        const part = multiPartData[i];
        if(!part.filename) {
            responses.push({
                index: i,
                fileName: "",
                status: 1,
                failureReason: NuggetUploadFailureReasons.NoFileName,
            });
            continue;
        }

        // TODO: If i upload a 1gb file the server crashes :/
        if(part.data.byteLength > nuggetMaxImageFileSize) {
            responses.push({
                index: i,
                fileName: part.filename,
                status: 1,
                failureReason: NuggetUploadFailureReasons.ImageFileSizeExceeded,
            });
            continue;
        }

        promises.push(writeNugget(part.filename, i, part.data));
    }

    const resolves = await Promise.all(promises);

    const nowTimestamp = Date.now();

    for (const resolve of resolves) {
        const metaData: NuggetMetaData = {
            nuggetId: resolve.nuggetId,
            nuggetFileName: resolve.fileName,
            uploadUserId: session.user?.id ?? "", // TODO: Verify user before uploading
            uploadTimestamp: nowTimestamp,
            image: `/nuggets/${resolve.nuggetId}/${resolve.fileName}`,
        };

        responses.push({
            index: resolve.index,
            fileName: resolve.fileName,
            status: NuggetUploadResponseStatuses.Success,
            metaData,
        });

        const storage = useStorage("data");
        await storage.setItem<NuggetMetaData>(`nuggets:${resolve.nuggetId}`, metaData);
    }

    responses.sort(r => r.index);

    return responses;
});

async function writeNugget(fileName: string, index: number, data: Buffer): Promise<{ index: number, fileName: string, nuggetId: string }> {
    const nuggetDir = getNuggetDirectory();

    const nuggetId = createNuggetId();
    const fileDir = path.join(nuggetDir, nuggetId);
    await mkdir(fileDir, {recursive: true});
    const filePath = path.join(fileDir, fileName);
    console.log(`Writing nugget to ${filePath}`);
    await fs.writeFile(filePath, data);

    return { index, fileName, nuggetId };
}
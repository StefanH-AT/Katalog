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

    const promises: Promise<NuggetWriteResult | null>[] = [];
    const fileNames: string[] = [];

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

        const writePromise = writeNugget(part.filename, part.data);
        promises.push(writePromise);
        fileNames.push(part.filename);
    }

    const resolves = await Promise.all(promises);

    const nowTimestamp = Date.now();

    for (let i = 0; i < resolves.length; i++){
        const resolve = resolves[i];

        if(resolve === null) {
            responses.push({
                status: NuggetUploadResponseStatuses.Failure,
                failureReason: NuggetUploadFailureReasons.Internal_IdCreationFailed,
                index: i,
                fileName: fileNames[i],
            })
            continue;
        }

        const metaData: NuggetMetaData = {
            nuggetId: resolve.nuggetId,
            nuggetFileName: fileNames[i],
            uploadUserId: session.user?.id ?? "", // TODO: Verify user before uploading
            uploadTimestamp: nowTimestamp,
            image: resolve.publicPath,
        };

        responses.push({
            index: i,
            fileName: fileNames[i],
            status: NuggetUploadResponseStatuses.Success,
            metaData,
        });

        const storage = useStorage("data");
        await storage.setItem<NuggetMetaData>(`nuggets:${resolve.nuggetId}`, metaData);
    }

    responses.sort(r => r.index);

    return responses;
});

interface NuggetWriteResult {
    publicPath: string;
    nuggetId: string;
}

async function writeNugget(fileName: string, data: Buffer): Promise<NuggetWriteResult | null> {
    const nuggetDir = getNuggetDirectory();

    const nuggetId = await createNuggetId();
    if(!nuggetId) return null;

    const fileExtension = path.extname(fileName);
    const newFileName = nuggetId + fileExtension;
    const finalFilePath = path.join(nuggetDir, newFileName);
    await mkdir(nuggetDir, {recursive: true});
    await fs.writeFile(finalFilePath, data);

    return { nuggetId, publicPath: `/api/nugget_files/${newFileName}` };
}
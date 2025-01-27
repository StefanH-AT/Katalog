import fs from "fs/promises";
import path from "node:path";
import {mkdir} from "node:fs/promises";
import {nuggetMaxImageFileSize} from "~/shared/nugget/NuggetUploadLimits";
import {
    NuggetUploadFailureReasons,
    NuggetUploadResponse,
    NuggetUploadResponseStatuses
} from "~/shared/nugget/NuggetUploadResponse";
import {createNuggetId, getNuggetDirectory} from "~/server/utils/nugget";
import {protectEndpoint} from "~/server/utils/EndpointProtection";
import {
    getNuggetType,
    type ImageNuggetMetaData,
    Nugget,
    type NuggetImageFormat,
    NuggetType,
    NuggetTypes
} from "#shared/nugget/Nugget";
import sharp from "sharp";

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
                status: NuggetUploadResponseStatuses.Failure,
                failureReason: NuggetUploadFailureReasons.NoFileName,
            });
            continue;
        }

        // TODO: If i upload a 1gb file the server crashes :/
        if(part.data.byteLength > nuggetMaxImageFileSize) {
            responses.push({
                index: i,
                fileName: part.filename,
                status: NuggetUploadResponseStatuses.Failure,
                failureReason: NuggetUploadFailureReasons.ImageFileSizeExceeded,
            });
            continue;
        }

        const nuggetType = getNuggetType(part.type ?? "");
        if(!nuggetType) {
            console.log("Nugget uploaded with invalid file type", part.type);
            responses.push({
                index: i,
                fileName: part.filename,
                status: NuggetUploadResponseStatuses.Failure,
                failureReason: NuggetUploadFailureReasons.InvalidFileType,
            });
            continue;
        }

        if(nuggetType === NuggetTypes.Image) {
            const writePromise = writeImageNugget(part.data, part.type as NuggetImageFormat); // This is safe because getNuggetType already does the type guard check
            promises.push(writePromise);
            fileNames.push(part.filename);
        }
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

        let nugget: Nugget | undefined;
        if(resolve.nuggetType === NuggetTypes.Image)
        {
            nugget = {
                type: "Image",
                nuggetId: resolve.nuggetId,
                nuggetFileName: fileNames[i],
                uploadUserId: session.user?.id ?? AnonymousUser.id,
                uploadTimestamp: nowTimestamp,
                image: resolve.publicPath,
                metaData: resolve.metaData,
            };
        }

        if(nugget === undefined) {
            console.log("Nugget was stored but got back with invalid nugget type", resolve.nuggetType);
            continue;
        }

        responses.push({
            index: i,
            fileName: fileNames[i],
            status: NuggetUploadResponseStatuses.Success,
            metaData: nugget,
        });

        const storage = useStorage("data");
        await storage.setItem<Nugget>(`nuggets:${resolve.nuggetId}`, nugget);
    }

    responses.sort(r => r.index);

    return responses;
});

interface NuggetBaseWriteResult {
    publicPath: string;
    nuggetId: string;
    nuggetType: NuggetType;
}

type NuggetWriteResult = NuggetImageWriteResult | NuggetVideoWriteResult;

interface NuggetImageWriteResult extends NuggetBaseWriteResult {
    nuggetType: "Image",
    metaData: ImageNuggetMetaData;
}

interface NuggetVideoWriteResult extends NuggetBaseWriteResult {
    nuggetType: "Video",
}

async function writeNuggetFile(data: Buffer, extension: string): Promise<{ nuggetId: string, publicPath: string } | null> {
    const nuggetDir = getNuggetDirectory();

    const nuggetId = await createNuggetId();
    if(!nuggetId) return null;

    const newFileName = nuggetId + "." + extension;
    const finalFilePath = path.join(nuggetDir, newFileName);
    await mkdir(nuggetDir, {recursive: true});
    await fs.writeFile(finalFilePath, data);

    const publicPath = `/api/nugget_files/${newFileName}`;

    return {nuggetId, publicPath};
}

async function writeImageNugget(data: Buffer, fileType: NuggetImageFormat): Promise<NuggetImageWriteResult | null> {
    const extension = fileType.split("/")[1]; // TODO: This is potentially unsafe
    const written = await writeNuggetFile(data, extension);
    if(!written) return null;

    const meta = await sharp(data).metadata();

    // TODO: Handle the case where this image has no size
    const metaData: ImageNuggetMetaData = {
        resX: meta.width ?? 0,
        resY: meta.height ?? 0,
        format: fileType,
    }
    return { nuggetType: NuggetTypes.Image, metaData, nuggetId: written.nuggetId, publicPath: written.publicPath };
}
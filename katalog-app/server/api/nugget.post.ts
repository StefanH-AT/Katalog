export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    if(!body) {
        throw createError({
            statusCode: 400,
            statusMessage: "Body is empty",
        });
    }

    if(!body.files) {
        throw createError({
           statusCode: 400,
           statusMessage: "No files",
        });
    }

    if(!Array.isArray(body.files)) {
        throw createError({
           statusCode: 400,
           statusMessage: "Files are not array",
        });
    }

    const anyFilesArray = body.files as any[];

});
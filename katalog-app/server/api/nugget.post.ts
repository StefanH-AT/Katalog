export default defineEventHandler(async (event) => {
    const multiPartData = await readMultipartFormData(event);
    if(!multiPartData) {
        throw createError({
            statusCode: 400,
            statusMessage: "Multi part form data is empty",
        });
    }

    console.log("Got multi part form data");

    for (const data of multiPartData) {
        console.log(data.filename);
    }
});
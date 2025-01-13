import {isValidNuggetId} from "~/server/utils/nugget";
import fs from "fs/promises";
import path from "node:path";

export default defineEventHandler(async (event) => {
    const session = await protectEndpoint(event);

    const nuggetId = getRouterParam(event, "nuggetId") ?? "";

    if(!isValidNuggetId(nuggetId)) {
        throw createError("Invalid nugget id");
    }

    const nuggetDir = getNuggetDirectory();
    const filePath = path.join(nuggetDir, nuggetId);
    const content = await fs.readFile(filePath);
    return content;
});
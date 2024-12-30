import {protectEndpoint} from "~/server/utils/EndpointProtection";
import type {NuggetDeleteResponse} from "#shared/nugget/NuggetDeleteResponse";

export default defineEventHandler(async (event): Promise<NuggetDeleteResponse> => {
    await protectEndpoint(event);

    const nuggetId = getRouterParam(event, "nuggetId");
    const storage = useStorage("data");

    await storage.removeItem(`nuggets:${nuggetId}`);

    return { success: true };
});
import {protectEndpoint} from "~/server/utils/EndpointProtection";

export default defineEventHandler(async (event) => {
    await protectEndpoint(event);

    const nuggetId = getRouterParam(event, "nuggetId");

    const storage = useStorage("data");

    const nugget = await storage.getItem(`nuggets:${nuggetId}`);
    return nugget;
});
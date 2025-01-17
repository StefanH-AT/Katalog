import {protectEndpoint} from "~/server/utils/EndpointProtection";

export default defineEventHandler(async (event) => {
    await protectEndpoint(event);

    const storage = useStorage("data");

    const keys = await storage.getKeys("nuggets");
    const nuggets = (await Promise.all(keys.map((k) => storage.getItem(k)))).toReversed();

    return nuggets;
});
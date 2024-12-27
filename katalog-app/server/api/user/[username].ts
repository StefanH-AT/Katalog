import {protectEndpoint} from "~/server/utils/EndpointProtection";

export default defineEventHandler(async (event) => {
    await protectEndpoint(event);

    const username = getRouterParam(event, "username");
    const store = useStorage("data");
    const kv = await store.getItem(`user:${username}`);
    return kv;
});
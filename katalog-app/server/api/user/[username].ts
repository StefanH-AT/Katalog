export default defineEventHandler(async (event) => {
    const username = getRouterParam(event, "username");
    const store = useStorage("data");
    const kv = await store.getItem(`user:${username}`);

    return kv;
});
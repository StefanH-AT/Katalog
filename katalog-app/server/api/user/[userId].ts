import {protectEndpoint} from "~/server/utils/EndpointProtection";
import {AnonymousUser, KatalogUser, KatalogUserProfile} from "#shared/user/KatalogUser";

export default defineEventHandler(async (event) => {
    await protectEndpoint(event);

    const userId = getRouterParam(event, "userId");
    if(userId === AnonymousUser.id) {
        return AnonymousUser;
    }

    const store = useStorage("data");
    const storedUser = await store.getItem(`user:${userId}`) as KatalogUser | undefined;

    if(!storedUser) {
        return undefined;
    }

    const profile: KatalogUserProfile = {
        id: storedUser.id,
        avatarUrl: storedUser.avatarUrl,
        color: storedUser.color,
        displayName: storedUser.displayName,
        name: storedUser.name,
    };

    return profile;
});
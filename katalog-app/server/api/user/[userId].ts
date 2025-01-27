import {protectEndpoint} from "~/server/utils/EndpointProtection";
import {StoredUser} from "~/server/utils/StoredUser";
import {UserProfile} from "#shared/user/UserProfile";

export default defineEventHandler(async (event) => {
    await protectEndpoint(event);

    const userId = getRouterParam(event, "userId");
    if(userId === AnonymousUser.id) {
        return AnonymousUser;
    }

    const store = useStorage("data");
    const storedUser = await store.getItem(`user:${userId}`) as StoredUser | undefined;

    if(!storedUser) {
        return undefined;
    }

    const profile: UserProfile = {
        id: storedUser.id,
        avatarUrl: storedUser.image,
        color: storedUser.color,
        displayName: storedUser.displayName,
        name: storedUser.name,
    };

    return profile;
});
import {protectEndpoint} from "~/server/utils/EndpointProtection";
import {StoredUser} from "~/server/utils/StoredUser";
import {UserProfile} from "#shared/user/UserProfile";

export default defineEventHandler(async (event) => {
    await protectEndpoint(event);

    const username = getRouterParam(event, "username");
    const store = useStorage("data");
    const storedUser = await store.getItem(`user:${username}`) as StoredUser;

    const profile: UserProfile = {
        id: storedUser.id,
        avatarUrl: storedUser.image,
        color: storedUser.color,
        displayName: storedUser.displayName,
        name: storedUser.name,
    };

    return profile;
});
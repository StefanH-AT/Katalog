import DiscordProvider, {DiscordProfile} from "next-auth/providers/discord"
import {randomUUID} from "uncrypto";
import {OAuthUserConfig} from "next-auth/providers/oauth";
import {UnstorageAdapter} from "@auth/unstorage-adapter";
import {NuxtAuthHandler} from "#auth";
import {StoredUser} from "~/server/utils/StoredUser";

interface FullDiscordProfile extends DiscordProfile {
    global_name: string;
}

export default NuxtAuthHandler({
    secret: useRuntimeConfig().auth.secret,
    // @ts-expect-error I don't know why this happens I guess auth.js isn't fully migrated and integrated with the nuxt port?
    adapter: UnstorageAdapter(useStorage("data")),
    providers: [
        // @ts-expect-error Use .default here for it to work during SSR.
        DiscordProvider.default({
            clientId: useRuntimeConfig().auth.discordClientId,
            clientSecret: useRuntimeConfig().auth.discordClientSecret,
            profile: (profile: FullDiscordProfile, tokens): StoredUser => {
                if (profile.avatar === null) {
                    const defaultAvatarNumber = parseInt(profile.discriminator) % 5
                    profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
                } else {
                    const format = profile.avatar.startsWith("a_") ? "gif" : "png"
                    profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
                }

                return {
                    id: generateUserId(),
                    name: profile.username,
                    email: profile.email,
                    image: profile.image_url,
                    displayName: profile.global_name,
                    color: profile.banner_color,
                    registerStatus: "unverified",
                }
            },
        } as OAuthUserConfig<any>)
    ],
    callbacks: {
        async session({ session, token, user, newSession }) {
            const resultSession = session;
            resultSession.user = user;
            return resultSession;
        },
    }
});

function generateUserId(): string {
    return randomUUID();
}

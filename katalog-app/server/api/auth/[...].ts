import DiscordProvider from "next-auth/providers/discord"
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
    secret: useRuntimeConfig().auth.secret,
    providers: [
        // @ts-ignore
        DiscordProvider.default({
            clientId: useRuntimeConfig().auth.discordClientId,
            clientSecret: useRuntimeConfig().auth.discordClientSecret,

        })
    ],
});
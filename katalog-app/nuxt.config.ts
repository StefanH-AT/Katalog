// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@sidebase/nuxt-auth'],
  runtimeConfig: {
    auth: {
      secret: "",
      discordClientId: "",
      discordClientSecret: "",
    }
  },
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: 'http://localhost:3000/api/auth',
    provider: {
      type: "authjs",
      trustHost: false,
      defaultProvider: "discord",
      addDefaultCallbackUrl: true,

    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    }
  }
})
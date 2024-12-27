// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@sidebase/nuxt-auth', '@nuxt/fonts'],
  runtimeConfig: {
    auth: {
      secret: "",
      discordClientId: "",
      discordClientSecret: "",
    }
  },
  auth: {
    isEnabled: process.env.NUXT_AUTH_DISABLE !== undefined && process.env.NUXT_AUTH_DISABLE !== "false",
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
    },
    globalAppMiddleware: true,
  },
  fonts: {
    families: [
      { name: "Inter", provider: "google" }
    ]
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', sizes: '128x128', href: '/katalog-icon-128.png' },
        { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/katalog-icon-64.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/katalog-icon-32.png' },
      ]
    }
  }
})
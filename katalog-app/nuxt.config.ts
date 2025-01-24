// https://nuxt.com/docs/api/configuration/nuxt-config

let authEnabled = true;
const envAuthDisable = process.env.NUXT_AUTH_DISABLE;
if(envAuthDisable && envAuthDisable !== "false") {
  authEnabled = false;

  console.log("Auth disabled");
}

const host = process.env.NUXT_HOST ?? "http://localhost:3000";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@sidebase/nuxt-auth', '@nuxt/fonts', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      siteName: "The Katalog",
      authDisabled: !authEnabled,
      host: host,
      perm: {
        view_feed: 0,
        new_account_role: 10,
      }
    },
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
    baseURL: `${host}/api/auth`,
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
    globalAppMiddleware: authEnabled,
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  fonts: {
    families: [
      { name: "Inter", provider: "google" }
    ]
  },
  css: ["~/assets/css/main.css"],
  ui: {

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
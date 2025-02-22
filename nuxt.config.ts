// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["@/assets/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/global.scss" as *;',
        },
      },
    },
  },
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      "Noto Sans": true,
      "Noto Serif": true,
    },
    download: true,
  },
});

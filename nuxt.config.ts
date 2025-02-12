// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  alias: {
    css: "</rootDir>/assets/css",
  },
  css: ["@/assets/css/main.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@formkit/auto-animate/nuxt",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
});

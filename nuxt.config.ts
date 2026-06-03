// https://nuxt.com/docs/api/configuration/nuxt-config
const gtagId = process.env.NUXT_PUBLIC_GTAG_ID || "G-PS6EDH7PN7"

export default defineNuxtConfig({
  modules: [
    "@nuxt/icon",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxtjs/sitemap",
    "@vercel/analytics",
    "@vercel/speed-insights",
  ],

  components: {
    dirs: [
      {
        path: "~/components",
        pattern: "**/*.vue", // Only consider .vue files as components
      },
    ],
  },
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "The Crafted Tale",
      meta: [
        { "http-equiv": "content-language", "content": "en" },
        { name: "description", content: "The Crafted Tale — bespoke handmade gifts for every occasion. Custom, semi-custom, and ready-made creations crafted with love and delivered with care across India." },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#8B1C1C" },
        { name: "robots", content: "index, follow" },
      ],
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
          async: true,
        },
        {
          innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gtagId}');`,
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:wght@300;400;500;600;700&display=swap",
        },
      ],
    },
  },
  css: ["~/assets/scss/main.scss"],
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://thecraftedtale.com",
  },
  runtimeConfig: {
    supabaseUrl: process.env.NUXT_SUPABASE_URL,
    supabaseServiceRoleKey: process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY,
    public: {
      /** Google Analytics 4 measurement ID (override with NUXT_PUBLIC_GTAG_ID) */
      gtagId,
    },
  },
  routeRules: {
    "/": { isr: 60 },
    "/products": { isr: 60 },
    "/products/**": { isr: 60 },
  },
  compatibilityDate: "2025-07-15",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables" as *;',
        },
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  image: {
    domains: ["images.unsplash.com"],
  },
  sitemap: {
    urls: [
      { loc: "/", changefreq: "daily", priority: 1.0 },
      { loc: "/products", changefreq: "daily", priority: 0.9 },
      { loc: "/about", changefreq: "monthly", priority: 0.6 },
      { loc: "/contact", changefreq: "monthly", priority: 0.5 },
      { loc: "/privacy", changefreq: "yearly", priority: 0.2 },
      { loc: "/terms", changefreq: "yearly", priority: 0.2 },
    ],
  },
})

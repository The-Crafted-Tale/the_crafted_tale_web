// https://nuxt.com/docs/api/configuration/nuxt-config
const gtagId = process.env.NUXT_PUBLIC_GTAG_ID || "G-PS6EDH7PN7"

// Duplicated from `app/composables/useContactInfo.ts` — nuxt.config is evaluated
// outside the app context, so the composable cannot be imported here.
const CONTACT = {
  email: "thecraftedtale.shop@gmail.com",
  phone: "+917709560271",
  instagram: "https://www.instagram.com/thecraftedtale.shop/",
  facebook: "https://www.facebook.com/thecraftedtale.shop",
  youtube: "https://youtube.com/thecraftedtale.shop",
}

// Primary market. The studio is service-area-only for now: there is no public
// street address, so `streetAddress` is deliberately absent from the schema
// identity below. Add it here (and in the Google Business Profile) if a
// walk-in address is ever published.
const LOCATION = {
  city: "Hyderabad",
  region: "Telangana",
  country: "IN",
}

// Public storage bucket host for product photography.
const supabaseHost = process.env.NUXT_SUPABASE_URL
  ? new URL(process.env.NUXT_SUPABASE_URL).host
  : undefined

// Only the production deployment should be indexable. Vercel sets VERCEL_ENV to
// "preview" on branch/PR deploys — without this, every preview URL competes with
// thecraftedtale.com for the same content.
const isProductionDeploy = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production"

export default defineNuxtConfig({
  modules: [
    "@nuxt/icon",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/fonts",
    // Bundles nuxt-robots, nuxt-sitemap, nuxt-og-image, nuxt-schema-org,
    // nuxt-link-checker and nuxt-seo-utils behind one module.
    "@nuxtjs/seo",
    // Both load `/_vercel/*` scripts that exist only on the Vercel platform.
    // Off-platform they 404 and log console errors, which drags down the local
    // Lighthouse "Best Practices" score. `VERCEL` is set automatically on Vercel.
    ...(process.env.VERCEL ? ["@vercel/analytics", "@vercel/speed-insights"] : []),
    // Gives Vitest the Nuxt runtime environment and `~` alias resolution.
    "@nuxt/test-utils/module",
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
      // Pages set only their own title; the brand suffix is appended here.
      titleTemplate: "%s %separator %siteName",
      meta: [
        { "http-equiv": "content-language", "content": "en" },
        { name: "description", content: "The Crafted Tale — bespoke handmade gifts for every occasion, handcrafted in Hyderabad. Custom, semi-custom, and ready-made creations delivered with care across India." },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#8B1C1C" },
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
      ],
    },
  },
  css: ["~/assets/scss/main.scss"],
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://thecraftedtale.com",
    name: "The Crafted Tale",
    description: "Bespoke handmade gifts for every occasion — custom, semi-custom, and ready-made creations, handcrafted in Hyderabad and delivered with care across India.",
    defaultLocale: "en-IN",
    indexable: isProductionDeploy,
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
    // JSON endpoints are crawlable (see `robots` above) but never indexable.
    "/api/**": { headers: { "X-Robots-Tag": "noindex, nofollow" } },
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

  fonts: {
    // Self-hosted and subset at build time, replacing the render-blocking
    // Google Fonts stylesheet that used to sit in `app.head.link`.
    families: [
      { name: "Playfair Display", provider: "google", weights: [400, 500, 600, 700, 800, 900], styles: ["normal", "italic"] },
      { name: "Poppins", provider: "google", weights: [300, 400, 500, 600, 700] },
      { name: "Great Vibes", provider: "google", weights: [400] },
    ],
    defaults: {
      preload: true,
    },
  },
  image: {
    // Remote hosts must be listed here or NuxtImg passes the URL straight
    // through unoptimized — no webp, no srcset. Product photos live in Supabase
    // storage; the host is derived from the same URL the server API uses.
    domains: ["images.unsplash.com", supabaseHost].filter(Boolean) as string[],
  },

  linkChecker: {
    // Dev-time only — a broken internal link should fail review, not a deploy.
    enabled: true,
    failOnError: false,
  },

  ogImage: {
    // The component is chosen per page with `defineOgImageComponent("Default")`;
    // only the canvas size is global.
    defaults: {
      width: 1200,
      height: 630,
    },
  },
  robots: {
    // The API is deliberately NOT disallowed here: pages fetch /api/products on
    // client-side navigation, and blocking it would stop Googlebot rendering
    // them. It is kept out of the index with an X-Robots-Tag header instead
    // (see routeRules below).
    //
    // Keeps aggressive SEO crawlers (Ahrefs, Semrush, …) off the site.
    blockNonSeoBots: true,
  },

  // Site-wide identity. Pages add only what is specific to them
  // (Product, BreadcrumbList, ItemList, …) via `useSchemaOrg`.
  schemaOrg: {
    identity: {
      // Must be a single string — the module lowercases it to pick a preset.
      // LocalBusiness (not Organization) is what ties the entity to a place;
      // the storefront nature is expressed with `additionalType` instead.
      type: "LocalBusiness",
      additionalType: "https://schema.org/Store",
      name: "The Crafted Tale",
      logo: "/og-image.png",
      image: "/og-image.png",
      description: "Bespoke handmade gifts for every occasion — custom, semi-custom, and ready-made creations, handcrafted in Hyderabad and delivered with care across India.",
      email: CONTACT.email,
      telephone: CONTACT.phone,
      address: {
        "@type": "PostalAddress",
        "addressLocality": LOCATION.city,
        "addressRegion": LOCATION.region,
        "addressCountry": LOCATION.country,
      },
      // Local first, national second — the studio ships India-wide but competes
      // for Hyderabad intent.
      areaServed: [
        { "@type": "City", "name": LOCATION.city },
        { "@type": "Country", "name": "India" },
      ],
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, UPI, Bank Transfer",
      contactPoint: {
        "@type": "ContactPoint",
        "telephone": CONTACT.phone,
        "email": CONTACT.email,
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"],
      },
      sameAs: [CONTACT.instagram, CONTACT.facebook, CONTACT.youtube],
    },
  },

  sitemap: {
    // Product URLs come from Supabase at request time. Registered explicitly:
    // auto-detection of `server/api/__sitemap__/urls.ts` did not fire here.
    sources: ["/api/__sitemap__/urls"],
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

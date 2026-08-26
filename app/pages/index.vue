<template>
  <div class="home">
    <HomeHeroSection />
    <HomeFeaturedProducts :products="featuredProducts" />
    <HomeHowItWorks />
    <HomeOurStory />
    <HomeTestimonials />
    <HomeCtaBanner />
  </div>
</template>

<script setup lang="ts">
const homeDescription
  = 'Shop bespoke handmade gifts for weddings, birthdays, festivals & every special occasion. Custom, semi-custom & ready-made creations crafted with love in India.'

// The brand suffix comes from `titleTemplate` in nuxt.config.ts.
useSeoMeta({
  title: 'Handmade Gifts, Delivered with Love',
  description: homeDescription,
  keywords: 'handmade gifts India, personalized gifts, custom gift boxes, bespoke gifts, handcrafted keepsakes, wedding gifts India, birthday gifts handmade, The Crafted Tale',
})

defineOgImageComponent('Default', {
  title: 'Handmade Gifts, Delivered with Love',
  description: homeDescription,
})

// Organization, Store and WebSite are declared site-wide in `schemaOrg.identity`
// (nuxt.config.ts). No SearchAction here — the site has no search endpoint to
// point one at yet.
useSchemaOrg([defineWebPage()])

const { getFeatured } = await useProductStore()

const featuredProducts = computed(() => getFeatured(4))
</script>

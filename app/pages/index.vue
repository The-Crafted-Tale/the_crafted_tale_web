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
  = 'Shop bespoke handmade gifts for weddings, birthdays, festivals & every special occasion. Handcrafted in Hyderabad — custom, semi-custom & ready-made, delivered across India.'

// The brand suffix comes from `titleTemplate` in nuxt.config.ts.
useSeoMeta({
  title: 'Handmade Gifts in Hyderabad, Delivered with Love',
  description: homeDescription,
  keywords: 'handmade gifts Hyderabad, personalized gifts Hyderabad, custom gift boxes, bespoke gifts, handcrafted keepsakes, wedding gifts Hyderabad, The Crafted Tale',
})

defineOgImageComponent('Default', {
  title: 'Handmade Gifts in Hyderabad, Delivered with Love',
  description: homeDescription,
})

// Organization, Store and WebSite are declared site-wide in `schemaOrg.identity`
// (nuxt.config.ts). No SearchAction here — the site has no search endpoint to
// point one at yet.
useSchemaOrg([defineWebPage()])

const { getFeatured } = await useProductStore()

const featuredProducts = computed(() => getFeatured(4))
</script>

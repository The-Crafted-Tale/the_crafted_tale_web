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
useSeoMeta({
  title: 'The Crafted Tale — Handmade Gifts, Delivered with Love',
  ogTitle: 'The Crafted Tale — Handmade Gifts, Delivered with Love',
  description:
    'Discover bespoke handmade gifts for every occasion. Custom, semi-custom, and ready-made creations crafted with love and delivered with care.',
  ogDescription:
    'Discover bespoke handmade gifts for every occasion. Custom, semi-custom, and ready-made creations crafted with love and delivered with care.',
  ogType: 'website',
})

const { getFeatured } = await useProductStore()

const featuredProducts = computed(() => getFeatured(4))
</script>

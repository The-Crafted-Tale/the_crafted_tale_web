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
import type { Product } from '~/types'

const { data: allProducts } = await useFetch<Product[]>('/api/products')

const featuredProducts = computed(() => (allProducts.value ?? []).slice(0, 4))
</script>

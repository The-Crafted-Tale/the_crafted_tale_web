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
import type { Product } from "~/types"

const featuredProducts: Product[] = [
  {
    name: "Royal Wedding Invitation",
    slug: "royal-wedding-invitation",
    price: 1299,
    category: "custom",
    images: ["https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&h=400&fit=crop"],
  },
  {
    name: "Floral Gift Box",
    slug: "floral-gift-box",
    price: 899,
    category: "semi_custom",
    images: ["https://images.unsplash.com/photo-1549465220-1a8b9238f664?w=400&h=400&fit=crop"],
  },
  {
    name: "Personalized Love Letter",
    slug: "personalized-love-letter",
    price: 450,
    category: "ready_made",
    images: ["https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop"],
  },
  {
    name: "Handmade Bouquet Box",
    slug: "handmade-bouquet-box",
    price: 1599,
    category: "custom",
    images: ["https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop"],
  },
]
</script>

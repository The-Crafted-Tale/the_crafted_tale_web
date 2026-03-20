<template>
  <section class="featured">
    <div class="featured__inner">
      <span class="section-label">OUR COLLECTION</span>
      <h2 class="section-title">
        Handcrafted with
        <span class="section-title__accent">Love</span>
      </h2>
      <p class="section-desc">
        Each piece is lovingly crafted by hand, making every gift unique and personal.
      </p>
      <div class="featured__grid">
        <ProductCard
          v-for="product in products"
          :key="product.slug"
          :product="product"
        />
      </div>
      <div class="featured__cta">
        <AppButton
          variant="primary"
          size="lg"
          href="/products"
        >
          View All Products
          <Icon
            name="mdi:arrow-right"
            size="1rem"
          />
        </AppButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

defineProps<{
  products: Product[]
}>()
</script>

<style lang="scss" scoped>
.featured {
  padding: 5rem 1.5rem;
  text-align: center;
  background: $brand-bg-blush;

  &__inner {
    max-width: 72rem;
    margin: 0 auto;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    gap: 2rem;
    margin-bottom: 2.5rem;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__cta {
    margin-top: 1rem;
  }
}
</style>

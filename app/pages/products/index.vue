<template>
  <div class="products-page">
    <section class="products-page__hero">
      <FloatingHearts :count="8" />
      <div class="products-page__hero-inner">
        <span class="section-label section-label--light">OUR COLLECTION</span>
        <h1 class="section-title section-title--light">
          Handcrafted
          <span class="section-title__accent">Treasures</span>
        </h1>
        <p class="products-page__hero-desc">
          Browse our lovingly crafted collection of gifts, keepsakes, and
          personalized creations.
        </p>
      </div>
    </section>

    <section class="products-page__content">
      <div class="products-page__filters" role="tablist" aria-label="Filter by category">
        <button v-for="tab in tabs" :key="tab.value ?? 'all'" role="tab" :aria-selected="activeCategory === tab.value"
          :class="[
            'products-page__tab',
            { 'products-page__tab--active': activeCategory === tab.value },
          ]" @click="activeCategory = tab.value">
          {{ tab.label }}
        </button>
      </div>

      <div v-if="filteredProducts.length" class="products-page__grid">
        <ProductCard v-for="product in filteredProducts" :key="product.slug" :product="product" />
      </div>

      <div v-else class="products-page__empty">
        <Icon name="mdi:heart-broken-outline" size="3rem" />
        <p>No products found in this category yet.</p>
        <AppButton variant="ghost" @click="activeCategory = undefined">
          View All Products
        </AppButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts';
import type { ProductCategory } from '~/types'

useSeoMeta({
  title: 'Products | The Crafted Tale',
  description:
    'Browse our handcrafted collection of gifts, keepsakes, and personalized creations. Custom, semi-custom, and ready-made options available.',
})

const { getAllProducts } = useProducts()

const tabs: { label: string; value: ProductCategory | undefined }[] = [
  { label: 'All', value: undefined },
  { label: 'Ready Made', value: 'ready_made' },
  { label: 'Semi Custom', value: 'semi_custom' },
  { label: 'Custom', value: 'custom' },
]

const activeCategory = ref<ProductCategory | undefined>(undefined)

const filteredProducts = computed(() => getAllProducts(activeCategory.value))
</script>

<style lang="scss" scoped>
.products-page {
  &__hero {
    position: relative;
    padding: 6rem 1.5rem 4rem;
    text-align: center;
    background: radial-gradient(ellipse at center,
        $brand-crimson 0%,
        $brand-crimson-dark 60%,
        $brand-maroon 100%);
    overflow: hidden;
  }

  &__hero-inner {
    position: relative;
    z-index: 1;
    max-width: 40rem;
    margin: 0 auto;
  }

  &__hero-desc {
    font-size: 1.0625rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.7;
  }

  &__content {
    max-width: 76rem;
    margin: 0 auto;
    padding: 3rem 1.5rem 5rem;
  }

  &__filters {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
  }

  &__tab {
    font-family: $font-body;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.5rem 1.25rem;
    border: 2px solid $border;
    border-radius: 2rem;
    background: #fff;
    color: $text-muted;
    cursor: pointer;
    transition:
      border-color 0.2s,
      color 0.2s,
      background-color 0.2s;

    &:hover {
      border-color: $border-hover;
      color: $text-secondary;
    }

    &--active {
      border-color: $brand-rose;
      color: $brand-rose;
      background: rgba($brand-rose, 0.05);
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;

    @include desktop-down {
      grid-template-columns: repeat(3, 1fr);
    }

    @include tablet-down {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 4rem 1rem;
    color: $text-muted;
    text-align: center;

    p {
      font-size: 1.0625rem;
    }
  }
}
</style>

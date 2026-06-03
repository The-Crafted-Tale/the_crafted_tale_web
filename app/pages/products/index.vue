<template>
  <div class="products-page">
    <PageHero label="OUR COLLECTION" title="Handcrafted" accent="Treasures"
      description="Browse our lovingly crafted collection of gifts, keepsakes, and personalized creations." />

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
        <template v-if="activeCategory">
          <Icon name="mdi:heart-broken-outline" size="3rem" />
          <p>No products found in this category yet.</p>
          <AppButton variant="ghost" @click="activeCategory = undefined">
            View All Products
          </AppButton>
        </template>
        <template v-else>
          <Icon name="mdi:basket-outline" size="3rem" />
          <p>Our shelves are being stocked with new handcrafted creations. Check back soon!</p>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ProductCategory } from '~/types'

const url = useRequestURL()

const productsDescription = `Browse handcrafted gifts, keepsakes & personalized creations for weddings, birthdays, and festive occasions.
Custom, semi-custom & ready-made options — all made by hand in India.`

useSeoMeta({
  title: 'Handcrafted Gifts & Personalized Keepsakes | The Crafted Tale',
  description: productsDescription,
  keywords: 'handcrafted gifts, personalized keepsakes, custom gifts India, semi-custom gifts, ready-made handmade gifts, wedding gifts, birthday gifts, festive gifts India',
  ogTitle: 'Handcrafted Gifts & Personalized Keepsakes | The Crafted Tale',
  ogDescription: productsDescription,
  ogUrl: url.href,
  twitterTitle: 'Handcrafted Gifts & Personalized Keepsakes | The Crafted Tale',
  twitterDescription: productsDescription,
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'Handcrafted Gifts & Personalized Keepsakes',
        'description': productsDescription,
        'url': url.href,
        'inLanguage': 'en-IN',
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': url.origin },
            { '@type': 'ListItem', 'position': 2, 'name': 'Products', 'item': url.href },
          ],
        },
      }),
    },
  ],
})

const tabs: { label: string, value: ProductCategory | undefined }[] = [
  { label: 'All', value: undefined },
  { label: 'Ready Made', value: 'ready_made' },
  { label: 'Semi Custom', value: 'semi_custom' },
  { label: 'Custom', value: 'custom' },
]

const activeCategory = ref<ProductCategory | undefined>(undefined)

const { getByCategory } = await useProductStore()

const filteredProducts = computed(() => getByCategory(activeCategory.value))
</script>

<style lang="scss" scoped>
.products-page {
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

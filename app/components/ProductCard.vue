<template>
  <NuxtLink :to="`/products/${product.slug}`" class="product-card">
    <div class="product-card__image-wrap">
      <img :src="product.images?.[0] || '/placeholder.svg'" :alt="product.name" class="product-card__image"
        loading="lazy" />
    </div>

    <div class="product-card__body">
      <CategoryBadge :category="product.category" />
      <h3 class="product-card__name">{{ product.name }}</h3>
      <PriceTag :amount="product.price" />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Product {
  name: string
  slug: string
  price: number
  category: 'custom' | 'semi_custom' | 'ready_made'
  images: string[]
}

defineProps<{
  product: Product
}>()
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.125rem 0.75rem rgba(0, 0, 0, 0.06);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  }

  &__image-wrap {
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    background: $brand-bg;
  }

  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover &__image {
    transform: scale(1.05);
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }

  &__name {
    font-family: $font-display;
    font-size: 1.05rem;
    font-weight: 600;
    color: $text-primary;
    line-height: 1.3;
    margin: 0;
  }
}
</style>

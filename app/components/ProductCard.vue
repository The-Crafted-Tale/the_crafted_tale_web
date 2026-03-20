<template>
  <NuxtLink :to="`/products/${product.slug}`" class="product-card">
    <div class="product-card__image-wrap">
      <img :src="imgSrc" :alt="product.name" class="product-card__image" loading="lazy" @error="onImgError" />
      <CategoryBadge :category="product.category" class="product-card__badge" />
      <div class="product-card__overlay">
        <span class="product-card__overlay-text">
          <Icon name="mdi:heart-outline" size="1rem" />
          View Details
        </span>
      </div>
    </div>
    <div class="product-card__body">
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

const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23f9f0f0' width='400' height='400'/%3E%3Cg transform='translate(200,185)'%3E%3Cpath d='M-40-20h80a8 8 0 0 1 8 8v52a8 8 0 0 1-8 8h-80a8 8 0 0 1-8-8v-52a8 8 0 0 1 8-8z' fill='none' stroke='%23c4909080' stroke-width='3'/%3E%3Cpath d='M0-20v80M-48 0h96' fill='none' stroke='%23c4909080' stroke-width='3'/%3E%3Cpath d='M-20-20c0 0 0-16 20-16s20 16 20 16' fill='none' stroke='%23c4909080' stroke-width='3' stroke-linecap='round'/%3E%3C/g%3E%3Ctext x='200' y='260' text-anchor='middle' fill='%23c49090' font-family='sans-serif' font-size='14'%3EImage unavailable%3C/text%3E%3C/svg%3E`

const props = defineProps<{ product: Product }>()

const imgSrc = ref(props.product.images[0])

function onImgError() {
  imgSrc.value = PLACEHOLDER
}
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.125rem 0.75rem rgba($brand-red-dark, 0.08);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-0.375rem);
    box-shadow: 0 0.75rem 2rem rgba($brand-red-dark, 0.15);
  }

  &__image-wrap {
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    background: $brand-bg-blush;
  }

  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &:hover &__image {
    transform: scale(1.08);
  }

  &__badge {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 2;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba($brand-crimson-dark, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover &__overlay {
    opacity: 1;
  }

  &__overlay-text {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #fff;
    font-family: $font-body;
    font-size: 0.9375rem;
    font-weight: 600;
    padding: 0.625rem 1.5rem;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 2rem;
    transition: background 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }

  &__name {
    font-family: $font-display;
    font-style: italic;
    font-size: 1.05rem;
    font-weight: 600;
    color: $brand-crimson;
    line-height: 1.3;
    margin: 0;
  }
}
</style>

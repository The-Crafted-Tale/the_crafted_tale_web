<template>
  <div class="gallery">
    <div class="gallery__main">
      <img v-if="failedImages.has(activeIndex) || !images[activeIndex]" :src="placeholderProduct" :alt="alt"
        class="gallery__main-image gallery__main-image--placeholder">
      <NuxtImg v-else :src="images[activeIndex]" :alt="alt" class="gallery__main-image"
        @error="onImageError(activeIndex)" />
    </div>

    <div v-if="images.length > 1" class="gallery__thumbs">
      <button v-for="(src, index) in images" :key="index"
        :class="['gallery__thumb', { 'gallery__thumb--active': index === activeIndex }]"
        :aria-label="`View image ${index + 1}`" type="button" @click="activeIndex = index">
        <img v-if="failedImages.has(index) || !src" :src="placeholderProduct" :alt="`${alt} thumbnail ${index + 1}`"
          class="gallery__thumb-placeholder">
        <NuxtImg v-else :src="src" :alt="`${alt} thumbnail ${index + 1}`" loading="lazy" @error="onImageError(index)" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import placeholderProduct from "~/assets/images/placeholder-product.svg"

interface Props {
  images: string[]
  alt?: string
}

withDefaults(defineProps<Props>(), {
  alt: "Product image",
})

const activeIndex = ref(0)
const failedImages = ref(new Set<number>())

function onImageError(index: number) {
  failedImages.value = new Set([...failedImages.value, index])
}
</script>

<style lang="scss" scoped>
.gallery {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;

  &__main {
    position: relative;
    width: 100%;
    padding-top: 100%;
    border-radius: 1rem;
    overflow: hidden;
    background: $brand-bg;
  }

  &__main-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;

    &--placeholder {
      object-fit: contain;
      padding: 2rem;
    }
  }

  &__thumbs {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.25rem;

    scrollbar-width: thin;
    scrollbar-color: $border transparent;

    @include tablet-down {
      gap: 0.375rem;
    }
  }

  &__thumb {
    flex-shrink: 0;
    width: 4rem;
    height: 4rem;
    padding: 0;
    border: 0.125rem solid transparent;
    border-radius: 0.5rem;
    overflow: hidden;
    cursor: pointer;
    background: $brand-bg;
    transition:
      border-color 0.2s ease,
      opacity 0.2s ease;

    img,
    :deep(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .gallery__thumb-placeholder {
      object-fit: contain;
      padding: 0.375rem;
    }

    &:hover {
      border-color: $border-hover;
    }

    &--active {
      border-color: $brand-red;

      &:hover {
        border-color: $brand-red;
      }
    }

    @include tablet-down {
      width: 3.5rem;
      height: 3.5rem;
    }
  }
}
</style>

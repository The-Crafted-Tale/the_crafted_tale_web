<template>
   <div class="gallery">
      <div class="gallery__main">
         <img v-if="failedImages.has(activeIndex) || !images[activeIndex]" :src="placeholderProduct" :alt="alt"
            class="gallery__main-image gallery__main-image--placeholder" />
         <!-- Product clips live in the same Supabase array as the photos, so the
              gallery plays them inline instead of handing them to NuxtImg. -->
         <video v-else-if="isVideoUrl(images[activeIndex]!)" :src="images[activeIndex]" :poster="posterUrl"
            :aria-label="`${alt} video`" class="gallery__main-image" controls playsinline preload="metadata"
            @error="onMediaError(activeIndex)" />
         <!-- The LCP element on a product page: eagerly loaded and preloaded
              rather than lazy, so it is not discovered late. -->
         <NuxtImg v-else :src="images[activeIndex]" :alt="alt" class="gallery__main-image" width="720" height="720"
            sizes="(max-width: 768px) 100vw, 640px" format="webp" preload loading="eager" fetchpriority="high"
            @error="onMediaError(activeIndex)" />
      </div>

      <div v-if="images.length > 1" class="gallery__thumbs">
         <button v-for="(src, index) in images" :key="index"
            :class="['gallery__thumb', { 'gallery__thumb--active': index === activeIndex }]"
            :aria-label="isVideoUrl(src) ? `Play video ${index + 1}` : `View image ${index + 1}`" type="button"
            @click="activeIndex = index">
            <img v-if="failedImages.has(index) || !src" :src="placeholderProduct" :alt="`${alt} thumbnail ${index + 1}`"
               class="gallery__thumb-placeholder" />
            <!-- A video has no thumbnail of its own; it borrows the poster and
                 wears a play badge so it reads as a clip, not a still. -->
            <template v-else-if="isVideoUrl(src)">
               <img v-if="!posterImage" :src="placeholderProduct" :alt="`${alt} video thumbnail ${index + 1}`"
                  class="gallery__thumb-placeholder" />
               <NuxtImg v-else :src="posterImage" :alt="`${alt} video thumbnail ${index + 1}`" loading="lazy" width="128"
                  height="128" sizes="64px" format="webp" />
               <span class="gallery__thumb-play" aria-hidden="true">
                  <Icon name="mdi:play" size="1.125rem" />
               </span>
            </template>
            <NuxtImg v-else :src="src" :alt="`${alt} thumbnail ${index + 1}`" loading="lazy" width="128" height="128"
               sizes="64px" format="webp" @error="onMediaError(index)" />
         </button>
      </div>
   </div>
</template>

<script setup lang="ts">
import placeholderProduct from '~/assets/images/placeholder-product.svg'

interface Props {
  /** Product media in studio order — photography, with the occasional clip. */
  images: string[]
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'Product image',
})

const activeIndex = ref(0)

const failedImages = ref(new Set<number>())

// Supabase stores no still for a clip, so the first product photo stands in as
// the poster. Without one the browser shows a black frame until playback.
const posterImage = computed(() => imageUrls(props.images)[0])

// `poster` is a plain attribute, so it misses the NuxtImg pipeline the rest of
// the gallery goes through — size it through the optimizer by hand.
const img = useImage()

const posterUrl = computed(() =>
  posterImage.value ? img(posterImage.value, { width: 720, height: 720, format: 'webp' }) : undefined,
)

const onMediaError = (index: number): void => {
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

   &__thumb-play {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background: rgba($brand-red-dark, 0.35);
      pointer-events: none;
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
      position: relative;
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

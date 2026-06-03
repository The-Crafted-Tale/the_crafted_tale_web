<template>
  <section class="story">
    <div class="story__inner">
      <div class="story__image-side">
        <div class="story__image-wrap">
          <NuxtImg :src="storyImgSrc" alt="Artisan crafting by hand" class="story__image" loading="lazy" width="600"
            height="700" sizes="(max-width: 768px) 100vw, 600px" format="webp" @error="onStoryImgError" />
          <div class="story__image-overlay">
            <p class="story__image-quote">
              Every piece has a soul
            </p>
          </div>
        </div>
      </div>
      <div class="story__text-side">
        <span class="section-label">OUR STORY</span>
        <h2 class="section-title">
          Every Craft Tells a
          <span class="section-title__accent">Story</span>
        </h2>
        <p class="story__text">
          At The Crafted Tale, we believe in the magic of handmade. Each creation is carefully
          crafted with passion, turning everyday moments into treasured memories.
        </p>
        <p class="story__text">
          From personalized keepsakes to bespoke gift boxes, we pour our heart into every detail —
          because your loved ones deserve something truly special.
        </p>
        <div class="story__badges">
          <span class="story__badge">
            <Icon name="mdi:hand-heart" size="1.125rem" />
            100% Handmade
          </span>
          <span class="story__badge">
            <Icon name="mdi:heart" size="1.125rem" />
            Made with Love
          </span>
          <span class="story__badge">
            <Icon name="mdi:leaf" size="1.125rem" />
            Eco-Friendly
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import placeholderStory from '~/assets/images/placeholder-story.svg';

const storyImgSrc = ref('https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=700&fit=crop')

const onStoryImgError = (): void => {
  storyImgSrc.value = placeholderStory
}
</script>

<style lang="scss" scoped>
.story {
  padding: 5rem 1.5rem;
  background: $brand-bg;

  &__inner {
    max-width: 68rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 3.5rem;
    align-items: center;

    @include tablet-down {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  &__image-wrap {
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 1rem 3rem rgba($brand-red-dark, 0.15);
  }

  &__image {
    width: 100%;
    height: auto;
    display: block;
  }

  &__image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem 1.5rem 1.5rem;
    background: linear-gradient(to top, rgba($brand-crimson-dark, 0.85), transparent);
  }

  &__image-quote {
    font-family: $font-cursive;
    font-size: 1.5rem;
    color: $brand-gold-light;
  }

  &__text {
    font-size: 1rem;
    color: $text-secondary;
    line-height: 1.8;
    margin-bottom: 1rem;
  }

  &__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1rem;
    font-family: $font-body;
    font-size: 0.8125rem;
    font-weight: 600;
    color: $brand-crimson;
    background: $brand-bg-deep;
    border-radius: 2rem;
  }
}
</style>

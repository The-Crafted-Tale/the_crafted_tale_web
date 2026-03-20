<template>
  <div class="about-page">
    <PageHero label="OUR STORY" title="The Heart Behind" accent="The Craft"
      description="Every handmade creation carries a piece of our soul — crafted with patience, passion, and a whole lot of love."
      :hearts="10" />

    <section class="about-page__story">
      <div class="about-page__story-inner">
        <div class="about-page__story-image-side">
          <div class="about-page__story-image-wrap">
            <NuxtImg :src="storyImgSrc" alt="Artisan workspace with craft supplies" class="about-page__story-image"
              loading="lazy" width="560" height="640" sizes="(max-width: 768px) 100vw, 560px" format="webp"
              @error="onStoryImgError" />
            <div class="about-page__story-image-overlay">
              <p class="about-page__story-image-quote">
                Where every piece begins
              </p>
            </div>
          </div>
        </div>
        <div class="about-page__story-text-side">
          <span class="section-label">HOW IT STARTED</span>
          <h2 class="section-title">
            A Tale That
            <span class="section-title__accent">Began</span>
            with Love
          </h2>
          <p class="about-page__text">
            The Crafted Tale was born from a simple belief: that the most
            meaningful gifts are the ones made by hand. What started as a hobby
            — crafting personalized cards and gift boxes for friends and family —
            quickly blossomed into a passion.
          </p>
          <p class="about-page__text">
            We saw how a handwritten note or a carefully curated gift box could
            light up someone's day in a way that store-bought items never could.
            That spark of joy, that moment of connection — that's what we live
            for.
          </p>
          <p class="about-page__text">
            Today, The Crafted Tale creates bespoke handmade gifts for every
            occasion — from weddings and birthdays to festivals and
            just-because moments. Each piece is designed, cut, and assembled by
            hand with care and attention to detail.
          </p>
        </div>
      </div>
    </section>

    <section class="about-page__values">
      <div class="about-page__values-inner">
        <span class="section-label">WHAT WE STAND FOR</span>
        <h2 class="section-title">
          Our
          <span class="section-title__accent">Values</span>
        </h2>
        <div class="about-page__values-grid">
          <div v-for="value in values" :key="value.title" class="value-card">
            <div class="value-card__icon-wrap">
              <Icon :name="value.icon" size="1.75rem" />
            </div>
            <h3 class="value-card__title">{{ value.title }}</h3>
            <p class="value-card__desc">{{ value.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="about-page__maker">
      <FloatingHearts :count="6" />
      <div class="about-page__maker-inner">
        <span class="section-label section-label--light">
          THE HANDS BEHIND THE ART
        </span>
        <h2 class="section-title section-title--light">
          Made with
          <span class="section-title__accent">Heart</span>
        </h2>
        <p class="about-page__maker-desc">
          Every product you see is handcrafted with dedication. From selecting
          the finest papers and materials to carefully assembling each detail, we
          pour our heart into every piece. We believe that when you give a
          handmade gift, you're giving a part of someone's time, skill, and love
          — and that's what makes it priceless.
        </p>
        <div class="about-page__maker-badges">
          <span class="about-page__maker-badge">
            <Icon name="mdi:hand-heart" size="1.125rem" />
            100% Handmade
          </span>
          <span class="about-page__maker-badge">
            <Icon name="mdi:leaf" size="1.125rem" />
            Eco-Friendly Materials
          </span>
          <span class="about-page__maker-badge">
            <Icon name="mdi:heart" size="1.125rem" />
            Made with Love
          </span>
          <span class="about-page__maker-badge">
            <Icon name="mdi:palette-outline" size="1.125rem" />
            Fully Customizable
          </span>
        </div>
      </div>
    </section>

    <section class="about-page__cta">
      <div class="about-page__cta-inner">
        <h2 class="about-page__cta-title">
          Ready to Find the Perfect Gift?
        </h2>
        <p class="about-page__cta-desc">
          Browse our collection or get in touch for something truly bespoke.
        </p>
        <div class="about-page__cta-actions">
          <AppButton variant="primary" size="lg" href="/products">
            <Icon name="mdi:sparkles" size="1.125rem" />
            Explore Collection
          </AppButton>
          <AppButton variant="ghost" size="lg" href="/contact">
            Get in Touch
          </AppButton>
        </div>
        <a :href="contact.instagram" target="_blank" rel="noopener noreferrer" class="about-page__instagram"
          aria-label="Follow us on Instagram">
          <Icon name="mdi:instagram" size="1.25rem" />
          Follow us on Instagram
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import placeholderStory from '~/assets/images/placeholder-story.svg'

const contact = useContactInfo()

const url = useRequestURL()

useSeoMeta({
  title: 'About | The Crafted Tale',
  description:
    'The Crafted Tale creates bespoke handmade gifts for every occasion. Learn about our story, values, and the hands behind the craft.',
  ogTitle: 'About | The Crafted Tale',
  ogDescription:
    'The Crafted Tale creates bespoke handmade gifts for every occasion. Learn about our story, values, and the hands behind the craft.',
  ogUrl: url.href,
  twitterTitle: 'About | The Crafted Tale',
  twitterDescription:
    'The Crafted Tale creates bespoke handmade gifts for every occasion. Learn about our story, values, and the hands behind the craft.',
})

const storyImgSrc = ref(
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=560&h=640&fit=crop',
)

function onStoryImgError() {
  storyImgSrc.value = placeholderStory
}

const values = [
  {
    icon: 'mdi:hand-heart',
    title: 'Crafted by Hand',
    desc: 'Every piece is made entirely by hand — no machines, no mass production. Just patient, skilled craftsmanship in every detail.',
  },
  {
    icon: 'mdi:account-heart-outline',
    title: 'Personal Touch',
    desc: "We work closely with you to understand your story, your occasion, and your loved one — so every gift feels deeply personal.",
  },
  {
    icon: 'mdi:leaf',
    title: 'Sustainable Materials',
    desc: 'We use eco-friendly and recycled materials wherever possible — handmade paper, natural dyes, and biodegradable packaging.',
  },
  {
    icon: 'mdi:quality-high',
    title: 'Uncompromising Quality',
    desc: 'From the paper we choose to the way we wrap your gift, we hold ourselves to the highest standard at every step.',
  },
  {
    icon: 'mdi:gift-outline',
    title: 'Made for Moments',
    desc: "Weddings, birthdays, festivals, or quiet gestures of love — we create gifts that turn everyday moments into lifelong memories.",
  },
  {
    icon: 'mdi:truck-delivery-outline',
    title: 'Delivered with Care',
    desc: 'Your gift is lovingly packaged and securely delivered, arriving just as beautiful as the day it was crafted.',
  },
]
</script>

<style lang="scss" scoped>
.about-page {

  // ---- Story section ----
  &__story {
    padding: 5rem 1.5rem;
    background: $brand-bg;
  }

  &__story-inner {
    max-width: 68rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 3.5rem;
    align-items: center;

    @include tablet-down {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  &__story-image-wrap {
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 1rem 3rem rgba($brand-red-dark, 0.15);
  }

  &__story-image {
    width: 100%;
    height: auto;
    display: block;
  }

  &__story-image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem 1.5rem 1.5rem;
    background: linear-gradient(to top,
        rgba($brand-crimson-dark, 0.85),
        transparent);
  }

  &__story-image-quote {
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

  // ---- Values section ----
  &__values {
    padding: 5rem 1.5rem;
    background: $brand-bg-blush;
    text-align: center;
  }

  &__values-inner {
    max-width: 72rem;
    margin: 0 auto;
  }

  &__values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 2.5rem;

    @include tablet-down {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  // ---- Maker section ----
  &__maker {
    position: relative;
    padding: 5rem 1.5rem;
    text-align: center;
    background: radial-gradient(ellipse at center,
        $brand-crimson 0%,
        $brand-crimson-dark 60%,
        $brand-maroon 100%);
    overflow: hidden;
  }

  &__maker-inner {
    position: relative;
    z-index: 1;
    max-width: 44rem;
    margin: 0 auto;
  }

  &__maker-desc {
    font-size: 1.0625rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.8;
    margin-top: 1rem;
  }

  &__maker-badges {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 2.5rem;
  }

  &__maker-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1rem;
    font-family: $font-body;
    font-size: 0.8125rem;
    font-weight: 600;
    color: $brand-gold;
    border: 1px solid rgba($brand-gold, 0.3);
    border-radius: 2rem;
  }

  // ---- CTA section ----
  &__cta {
    padding: 5rem 1.5rem;
    text-align: center;
    background: $brand-bg;
  }

  &__cta-inner {
    max-width: 36rem;
    margin: 0 auto;
  }

  &__cta-title {
    font-family: $font-display;
    font-size: 2rem;
    font-weight: 700;
    color: $text-primary;
    line-height: 1.3;
    margin-bottom: 0.75rem;

    @include mobile {
      font-size: 1.5rem;
    }
  }

  &__cta-desc {
    font-size: 1.0625rem;
    color: $text-muted;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  &__cta-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  &__instagram {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;
    font-family: $font-body;
    font-size: 0.9375rem;
    font-weight: 600;
    color: $brand-rose;
    text-decoration: none;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
}

.value-card {
  background: #fff;
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: 0 0.125rem 0.75rem rgba($brand-red-dark, 0.06);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 0.5rem 1.5rem rgba($brand-red-dark, 0.12);
  }

  &__icon-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    background: $brand-bg-deep;
    border-radius: 50%;
    color: $brand-crimson;
    margin-bottom: 1rem;
  }

  &__title {
    font-family: $font-body;
    font-size: 1.0625rem;
    font-weight: 700;
    color: $text-primary;
    margin-bottom: 0.5rem;
  }

  &__desc {
    font-size: 0.9375rem;
    color: $text-muted;
    line-height: 1.65;
  }
}
</style>

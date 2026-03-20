<template>
  <div class="home">
    <!-- HERO SECTION -->
    <section class="hero">
      <FloatingHearts :count="18" />
      <div class="hero__content">
        <span class="hero__subtitle">YOUR TALE, TO YOUR LOVED ONES</span>
        <h1 class="hero__title">
          Crafting Stories,
          <span class="hero__title-accent">One Gift at a Time</span>
        </h1>
        <p class="hero__desc">Handmade with love, delivered with care</p>
        <div class="hero__actions">
          <AppButton variant="gold" size="lg" href="/products">
            <Icon name="mdi:sparkles" size="1.125rem" />
            Explore Our Collection
          </AppButton>
          <AppButton variant="secondary" size="lg" href="/contact">
            Get in Touch
          </AppButton>
        </div>
        <div class="hero__scroll-hint" aria-hidden="true">
          <Icon name="mdi:mouse" size="1.5rem" />
          <Icon name="mdi:chevron-down" size="1rem" class="hero__scroll-arrow" />
        </div>
      </div>
    </section>

    <!-- FEATURED PRODUCTS -->
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
          <ProductCard v-for="product in featuredProducts" :key="product.slug" :product="product" />
        </div>
        <div class="featured__cta">
          <AppButton variant="primary" size="lg" href="/products">
            View All Products
            <Icon name="mdi:arrow-right" size="1rem" />
          </AppButton>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="how-it-works">
      <FloatingHearts :count="10" />
      <div class="how-it-works__inner">
        <span class="section-label section-label--light">SIMPLE PROCESS</span>
        <h2 class="section-title section-title--light">
          How It
          <span class="section-title__accent">Works</span>
        </h2>
        <div class="how-it-works__steps">
          <div v-for="(step, idx) in steps" :key="step.title" class="step">
            <div class="step__icon-wrap">
              <Icon :name="step.icon" size="1.75rem" class="step__icon" />
              <span class="step__number">{{ idx + 1 }}</span>
            </div>
            <h3 class="step__title">{{ step.title }}</h3>
            <p class="step__desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- OUR STORY -->
    <section class="story">
      <div class="story__inner">
        <div class="story__image-side">
          <div class="story__image-wrap">
            <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=700&fit=crop"
              alt="Artisan crafting by hand" class="story__image" loading="lazy" />
            <div class="story__image-overlay">
              <p class="story__image-quote">Every piece has a soul</p>
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
            At The Crafted Tale, we believe in the magic of handmade. Each creation
            is carefully crafted with passion, turning everyday moments into treasured
            memories.
          </p>
          <p class="story__text">
            From personalized keepsakes to bespoke gift boxes, we pour our heart into
            every detail — because your loved ones deserve something truly special.
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

    <!-- TESTIMONIALS -->
    <section class="testimonials">
      <div class="testimonials__inner">
        <span class="section-label">LOVE NOTES</span>
        <h2 class="section-title">
          What Our
          <span class="section-title__accent">Customers</span>
          Say
        </h2>
        <div class="testimonials__grid">
          <div v-for="review in reviews" :key="review.name" class="review-card">
            <div class="review-card__stars">
              <Icon v-for="n in 5" :key="n" name="mdi:star" size="1rem" class="review-card__star" />
            </div>
            <Icon name="mdi:format-quote-open" size="2rem" class="review-card__quote-icon" />
            <p class="review-card__text">{{ review.text }}</p>
            <div class="review-card__author">
              <div class="review-card__avatar">{{ review.name[0] }}</div>
              <div>
                <p class="review-card__name">{{ review.name }}</p>
                <p class="review-card__location">{{ review.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA BANNER -->
    <section class="cta-banner">
      <FloatingHearts :count="12" />
      <div class="cta-banner__content">
        <h2 class="cta-banner__title">
          Ready to Create Something
          <span class="cta-banner__accent">Beautiful?</span>
        </h2>
        <p class="cta-banner__desc">
          Let us craft the perfect gift for your loved ones. Every order is made with passion and care.
        </p>
        <div class="cta-banner__actions">
          <AppButton variant="gold" size="lg" href="/contact">
            <Icon name="mdi:heart" size="1rem" />
            Start Your Order
          </AppButton>
          <AppButton variant="secondary" size="lg" href="https://wa.me/919494521472">
            <Icon name="mdi:whatsapp" size="1.125rem" />
            Chat with Us
          </AppButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const featuredProducts = [
  {
    name: 'Royal Wedding Invitation',
    slug: 'royal-wedding-invitation',
    price: 1299,
    category: 'custom' as const,
    images: ['https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&h=400&fit=crop'],
  },
  {
    name: 'Floral Gift Box',
    slug: 'floral-gift-box',
    price: 899,
    category: 'semi_custom' as const,
    images: ['https://images.unsplash.com/photo-1549465220-1a8b9238f664?w=400&h=400&fit=crop'],
  },
  {
    name: 'Personalized Love Letter',
    slug: 'personalized-love-letter',
    price: 450,
    category: 'ready_made' as const,
    images: ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop'],
  },
  {
    name: 'Handmade Bouquet Box',
    slug: 'handmade-bouquet-box',
    price: 1599,
    category: 'custom' as const,
    images: ['https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop'],
  },
]

const steps = [
  {
    icon: 'mdi:heart-outline',
    title: 'Choose Your Gift',
    desc: 'Browse our handcrafted collection and pick the perfect piece for your loved one.',
  },
  {
    icon: 'mdi:pencil-outline',
    title: 'Personalize It',
    desc: 'Add your personal touch — names, messages, photos, and special details.',
  },
  {
    icon: 'mdi:gift-outline',
    title: 'We Deliver with Love',
    desc: 'We craft your gift by hand and deliver it beautifully packaged to your doorstep.',
  },
]

const reviews = [
  {
    name: 'Priya Sharma',
    location: 'Hyderabad',
    text: 'Absolutely loved the wedding invitation! The attention to detail was incredible. My guests were amazed by the craftsmanship.',
  },
  {
    name: 'Rahul Mehta',
    location: 'Mumbai',
    text: 'Ordered a personalized gift box for our anniversary. My wife was in tears — it was so thoughtful and beautifully made.',
  },
  {
    name: 'Ananya Reddy',
    location: 'Bangalore',
    text: 'The Crafted Tale truly puts love into every piece. The handmade bouquet box was stunning and made my mom\'s birthday unforgettable.',
  },
]
</script>

<style lang="scss" scoped>
// ---- Shared Section Styles ----

.section-label {
  display: block;
  font-family: $font-body;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: $brand-gold;
  margin-bottom: 0.75rem;

  &--light {
    color: $brand-gold-light;
  }
}

.section-title {
  font-family: $font-display;
  font-size: 2.25rem;
  font-weight: 700;
  color: $text-primary;
  line-height: 1.25;
  margin-bottom: 1rem;

  &--light {
    color: #fff;
  }

  &__accent {
    font-family: $font-cursive;
    font-weight: 400;
    color: $brand-gold;
    font-size: 1.15em;
  }

  @include mobile {
    font-size: 1.75rem;
  }
}

.section-desc {
  font-size: 1.0625rem;
  color: $text-muted;
  max-width: 36rem;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
}

// ---- HERO ----

.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at center, $brand-crimson 0%, $brand-crimson-dark 50%, $brand-maroon 100%);
  overflow: hidden;

  &__content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 4rem 1.5rem;
    max-width: 48rem;
  }

  &__subtitle {
    display: inline-block;
    font-family: $font-body;
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.25em;
    color: $brand-gold;
    margin-bottom: 1.25rem;
  }

  &__title {
    font-family: $font-display;
    font-size: 3.5rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 1.25rem;

    @include tablet-down {
      font-size: 2.5rem;
    }

    @include mobile {
      font-size: 2rem;
    }
  }

  &__title-accent {
    display: block;
    font-family: $font-cursive;
    font-weight: 400;
    color: $brand-gold;
    font-size: 1.1em;
    margin-top: 0.25rem;
  }

  &__desc {
    font-family: $font-body;
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2.5rem;
    line-height: 1.6;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }

  &__scroll-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.125rem;
    color: rgba(255, 255, 255, 0.4);
    animation: scroll-bounce 2s ease-in-out infinite;
  }

  &__scroll-arrow {
    animation: scroll-bounce 2s ease-in-out infinite;
  }
}

@keyframes scroll-bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(6px);
  }
}

// ---- FEATURED PRODUCTS ----

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

// ---- HOW IT WORKS ----

.how-it-works {
  position: relative;
  padding: 5rem 1.5rem;
  text-align: center;
  background: radial-gradient(ellipse at center, $brand-crimson 0%, $brand-crimson-dark 60%, $brand-maroon 100%);
  overflow: hidden;

  &__inner {
    position: relative;
    z-index: 1;
    max-width: 64rem;
    margin: 0 auto;
  }

  &__steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
    margin-top: 2.5rem;

    @include tablet-down {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &__icon-wrap {
    position: relative;
    width: 4.5rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
  }

  &__icon {
    color: $brand-gold;
  }

  &__number {
    position: absolute;
    top: -0.375rem;
    right: -0.375rem;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $brand-gold;
    color: $brand-crimson-dark;
    font-family: $font-body;
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 50%;
  }

  &__title {
    font-family: $font-body;
    font-size: 1.125rem;
    font-weight: 600;
    color: #fff;
  }

  &__desc {
    font-size: 0.9375rem;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.6;
    max-width: 18rem;
  }
}

// ---- OUR STORY ----

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

// ---- TESTIMONIALS ----

.testimonials {
  padding: 5rem 1.5rem;
  text-align: center;
  background: $brand-bg-blush;

  &__inner {
    max-width: 72rem;
    margin: 0 auto;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 2.5rem;

    @include tablet-down {
      grid-template-columns: 1fr;
    }
  }
}

.review-card {
  background: #fff;
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  text-align: left;
  box-shadow: 0 0.125rem 0.75rem rgba($brand-red-dark, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0.5rem 1.5rem rgba($brand-red-dark, 0.12);
  }

  &__stars {
    display: flex;
    gap: 0.125rem;
    margin-bottom: 1rem;
  }

  &__star {
    color: #e8b730;
  }

  &__quote-icon {
    color: rgba($brand-rose, 0.2);
    margin-bottom: 0.5rem;
  }

  &__text {
    font-size: 0.9375rem;
    color: $text-secondary;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  &__author {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__avatar {
    width: 2.75rem;
    height: 2.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, $brand-rose, $brand-red-dark);
    color: #fff;
    font-family: $font-display;
    font-size: 1.125rem;
    font-weight: 700;
    border-radius: 50%;
  }

  &__name {
    font-family: $font-body;
    font-size: 0.9375rem;
    font-weight: 600;
    color: $text-primary;
    margin: 0;
  }

  &__location {
    font-size: 0.8125rem;
    color: $text-muted;
    margin: 0;
  }
}

// ---- CTA BANNER ----

.cta-banner {
  position: relative;
  padding: 5rem 1.5rem;
  text-align: center;
  background: radial-gradient(ellipse at center, $brand-crimson 0%, $brand-crimson-dark 60%, $brand-maroon 100%);
  overflow: hidden;

  &__content {
    position: relative;
    z-index: 1;
    max-width: 40rem;
    margin: 0 auto;
  }

  &__title {
    font-family: $font-display;
    font-size: 2.25rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.3;
    margin-bottom: 1rem;

    @include mobile {
      font-size: 1.75rem;
    }
  }

  &__accent {
    font-family: $font-cursive;
    font-weight: 400;
    color: $brand-gold;
    font-size: 1.15em;
  }

  &__desc {
    font-size: 1.0625rem;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.7;
    margin-bottom: 2rem;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
}
</style>

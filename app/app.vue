<template>
  <div class="showcase">
    <h1 class="showcase__title">Component Showcase</h1>

    <!-- Logo -->
    <section class="showcase__section">
      <h2 class="showcase__heading">AppLogo</h2>
      <div class="showcase__row">
        <div class="showcase__item">
          <span class="showcase__label">sm</span>
          <AppLogo size="sm" />
        </div>
        <div class="showcase__item">
          <span class="showcase__label">md</span>
          <AppLogo size="md" />
        </div>
        <div class="showcase__item">
          <span class="showcase__label">lg</span>
          <AppLogo size="lg" />
        </div>
      </div>
    </section>

    <!-- Typography -->
    <section class="showcase__section">
      <h2 class="showcase__heading">Typography</h2>
      <p class="showcase__font-display">Playfair Display — The Crafted Tale</p>
      <p class="showcase__font-body">Poppins — Clean body text for the storefront</p>
      <p class="showcase__font-cursive">Great Vibes — Handcrafted with love</p>
    </section>

    <!-- Colors -->
    <section class="showcase__section">
      <h2 class="showcase__heading">Brand Colors</h2>
      <div class="showcase__row">
        <div class="showcase__swatch showcase__swatch--red">
          <span>$brand-red</span>
          <span>#D02953</span>
        </div>
        <div class="showcase__swatch showcase__swatch--red-dark">
          <span>$brand-red-dark</span>
          <span>#8E0026</span>
        </div>
        <div class="showcase__swatch showcase__swatch--gold">
          <span>$brand-gold</span>
          <span>#E6D677</span>
        </div>
      </div>
    </section>

    <!-- Buttons -->
    <section class="showcase__section">
      <h2 class="showcase__heading">AppButton — Variants</h2>
      <div class="showcase__row">
        <AppButton variant="primary">Primary</AppButton>
        <AppButton variant="secondary">Secondary</AppButton>
        <AppButton variant="ghost">Ghost</AppButton>
      </div>

      <h3 class="showcase__subheading">Sizes</h3>
      <div class="showcase__row">
        <AppButton size="sm">Small</AppButton>
        <AppButton size="md">Medium</AppButton>
        <AppButton size="lg">Large</AppButton>
      </div>

      <h3 class="showcase__subheading">States</h3>
      <div class="showcase__row">
        <AppButton :loading="true">Loading...</AppButton>
        <AppButton :disabled="true">Disabled</AppButton>
        <AppButton href="/products" variant="secondary">As Link</AppButton>
      </div>
    </section>

    <!-- Inputs -->
    <section class="showcase__section">
      <h2 class="showcase__heading">AppInput</h2>
      <div class="showcase__grid">
        <AppInput label="Name" placeholder="Enter your name" v-model="demoName" />
        <AppInput label="Email" type="email" placeholder="you@example.com" v-model="demoEmail" />
        <AppInput label="Phone" type="tel" placeholder="+91 98765 43210" v-model="demoPhone" />
        <AppInput label="With Error" placeholder="Required field" error="This field is required" v-model="demoError" />
        <AppInput label="Message" type="textarea" placeholder="Tell us about your order..." v-model="demoMessage" />
      </div>
    </section>

    <!-- Category Badges -->
    <section class="showcase__section">
      <h2 class="showcase__heading">CategoryBadge</h2>
      <div class="showcase__row">
        <CategoryBadge category="custom" />
        <CategoryBadge category="semi_custom" />
        <CategoryBadge category="ready_made" />
      </div>
    </section>

    <!-- Price Tags -->
    <section class="showcase__section">
      <h2 class="showcase__heading">PriceTag</h2>
      <div class="showcase__row">
        <PriceTag :amount="450" />
        <PriceTag :amount="1299" />
        <PriceTag :amount="25000" />
      </div>
    </section>

    <!-- Product Cards -->
    <section class="showcase__section showcase__section--wide">
      <h2 class="showcase__heading">ProductCard</h2>
      <div class="showcase__product-grid">
        <ProductCard v-for="product in mockProducts" :key="product.slug" :product="product" />
      </div>
    </section>

    <!-- Image Gallery -->
    <section class="showcase__section">
      <h2 class="showcase__heading">ImageGallery</h2>
      <div class="showcase__gallery-wrap">
        <ImageGallery :images="mockGalleryImages" alt="Showcase product" />
      </div>
    </section>

    <!-- Contact Form -->
    <section class="showcase__section">
      <h2 class="showcase__heading">ContactForm</h2>
      <ContactForm prefill-product="Royal Wedding Card" @submit="onContactSubmit" />
      <p v-if="contactSubmitted" class="showcase__success">Form submitted successfully!</p>
    </section>

    <!-- Social Items -->
    <section class="showcase__section">
      <h2 class="showcase__heading">SocialItems (refactored with @nuxt/icon)</h2>
      <SocialItems />
    </section>
  </div>

  <WhatsAppFloat />
</template>

<script setup lang="ts">
const demoName = ref('')
const demoEmail = ref('')
const demoPhone = ref('')
const demoError = ref('')
const demoMessage = ref('')

const mockProducts = [
  {
    name: 'Royal Wedding Invitation',
    slug: 'royal-wedding-invitation',
    price: 1299,
    category: 'custom' as const,
    images: ['https://placehold.co/400x400/fce0e5/8e0026?text=Wedding+Card'],
  },
  {
    name: 'Floral Birthday Card',
    slug: 'floral-birthday-card',
    price: 450,
    category: 'ready_made' as const,
    images: ['https://placehold.co/400x400/d1fae5/065f46?text=Birthday+Card'],
  },
  {
    name: 'Elegant Anniversary Card',
    slug: 'elegant-anniversary-card',
    price: 899,
    category: 'semi_custom' as const,
    images: ['https://placehold.co/400x400/ede9fe/5b21b6?text=Anniversary'],
  },
]

const mockGalleryImages = [
  'https://placehold.co/600x600/fce0e5/8e0026?text=Image+1',
  'https://placehold.co/600x600/d1fae5/065f46?text=Image+2',
  'https://placehold.co/600x600/ede9fe/5b21b6?text=Image+3',
  'https://placehold.co/600x600/fef3c7/92400e?text=Image+4',
]

const contactSubmitted = ref(false)
function onContactSubmit(payload: { name: string; email: string; phone: string; message: string }) {
  console.log('Contact form submitted:', payload)
  contactSubmitted.value = true
  setTimeout(() => { contactSubmitted.value = false }, 3000)
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>

<style lang="scss" scoped>
.showcase {
  min-height: 100vh;
  padding: 3rem 2rem;
  background: $brand-bg;
  font-family: $font-body;

  &__title {
    font-family: $font-display;
    font-size: 2.25rem;
    color: $text-primary;
    margin-bottom: 2.5rem;
    text-align: center;
  }

  &__section {
    max-width: 48rem;
    margin: 0 auto 3rem;
    padding: 2rem;
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.05);
  }

  &__heading {
    font-family: $font-display;
    font-size: 1.5rem;
    color: $text-primary;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 0.0625rem solid $border;
  }

  &__subheading {
    font-family: $font-body;
    font-size: 1rem;
    font-weight: 600;
    color: $text-secondary;
    margin: 1.25rem 0 0.75rem;
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
  }

  &__grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 24rem;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  &__label {
    font-size: 0.75rem;
    font-weight: 500;
    color: $text-muted;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  // --- typography samples ---

  &__font-display {
    font-family: $font-display;
    font-size: 1.5rem;
    color: $text-primary;
    margin-bottom: 0.5rem;
  }

  &__font-body {
    font-family: $font-body;
    font-size: 1rem;
    color: $text-secondary;
    margin-bottom: 0.5rem;
  }

  &__font-cursive {
    font-family: $font-cursive;
    font-size: 1.75rem;
    color: $brand-red;
  }

  &__section--wide {
    max-width: 64rem;
  }

  &__product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
    gap: 1.5rem;
  }

  &__gallery-wrap {
    max-width: 24rem;
  }

  &__success {
    margin-top: 1rem;
    font-size: 0.9375rem;
    font-weight: 600;
    color: $success;
  }

  // --- color swatches ---

  &__swatch {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    width: 8rem;
    height: 5rem;
    border-radius: 0.75rem;
    font-family: $font-body;
    font-size: 0.6875rem;
    font-weight: 500;

    &--red {
      background: $brand-red;
      color: #fff;
    }

    &--red-dark {
      background: $brand-red-dark;
      color: #fff;
    }

    &--gold {
      background: $brand-gold;
      color: $text-primary;
    }
  }
}
</style>

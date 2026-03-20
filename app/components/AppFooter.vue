<template>
  <footer class="app-footer">
    <div class="app-footer__inner">
      <div class="app-footer__brand">
        <AppLogo size="sm" />
        <p class="app-footer__tagline">Handcrafted with love</p>
      </div>

      <nav class="app-footer__nav" aria-label="Footer navigation">
        <NuxtLink to="/products" class="app-footer__link">Products</NuxtLink>
        <NuxtLink to="/about" class="app-footer__link">About</NuxtLink>
        <NuxtLink to="/contact" class="app-footer__link">Contact</NuxtLink>
      </nav>

      <SocialItems />

      <p class="app-footer__copy">&copy; {{ currentYear }} The Crafted Tale. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.app-footer {
  background: $brand-bg-mid;
  border-top: 0.0625rem solid $border;

  &__inner {
    max-width: 72rem;
    margin: 0 auto;
    padding: 2.5rem 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }

  &__brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  &__tagline {
    font-family: $font-cursive;
    font-size: 1.25rem;
    color: $brand-red;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  &__link {
    font-family: $font-body;
    font-size: 0.875rem;
    font-weight: 500;
    color: $text-secondary;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: $brand-red;
    }
  }

  &__copy {
    font-family: $font-body;
    font-size: 0.8125rem;
    color: $text-muted;
  }
}
</style>

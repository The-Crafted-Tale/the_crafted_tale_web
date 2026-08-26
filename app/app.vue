<template>
  <div class="app-shell">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <AppHeader />
    <main id="main-content" class="app-shell__main">
      <NuxtPage />
    </main>
    <AppFooter />
    <WhatsAppFloat />
  </div>
</template>

<script setup lang="ts">
/**
 * Canonical URLs, og:site_name, og:locale, twitter:card and the default
 * og:image all come from `site` + the @nuxtjs/seo modules in nuxt.config.ts.
 * Pages set only their own title, description and og image.
 */
</script>

<style lang="scss" scoped>
.skip-link {
  position: absolute;
  top: -100%;
  left: 0.5rem;
  z-index: 9999;
  padding: 0.5rem 1rem;
  font-family: $font-body;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: $brand-crimson;
  border-radius: 0 0 0.5rem 0.5rem;
  text-decoration: none;

  &:focus {
    top: 0;
  }
}

.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__main {
    flex: 1;
  }
}
</style>

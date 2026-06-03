<template>
  <section class="page-hero">
    <FloatingHearts :count="hearts" />
    <div class="page-hero__inner">
      <span class="section-label section-label--light">{{ label }}</span>
      <h1 class="section-title section-title--light">
        {{ title }}
        <span class="section-title__accent">{{ accent }}</span>
      </h1>
      <p class="page-hero__desc">
{{ description }}
</p>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  title: string
  accent: string
  description: string
  hearts?: number
}>(), {
  hearts: 8,
})
</script>

<style lang="scss" scoped>
.page-hero {
  position: relative;
  padding: 6rem 1.5rem 4rem;
  text-align: center;
  background: radial-gradient(
    ellipse at center,
    $brand-crimson 0%,
    $brand-crimson-dark 60%,
    $brand-maroon 100%
  );
  overflow: hidden;

  &__inner {
    position: relative;
    z-index: 1;
    max-width: 40rem;
    margin: 0 auto;
  }

  &__desc {
    font-size: 1.0625rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.7;
  }
}
</style>

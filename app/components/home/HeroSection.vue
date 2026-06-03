<template>
  <section class="hero">
    <FloatingHearts :count="18" />
    <div class="hero__content">
      <span class="hero__subtitle">YOUR TALE, TO YOUR LOVED ONES</span>
      <h1 class="hero__title">
        The Crafted Tale
        <span class="hero__title-accent">One Gift at a Time</span>
      </h1>
      <p class="hero__desc">
Handmade with love, delivered with care
</p>
      <div class="hero__actions">
        <AppButton
variant="gold"
size="lg"
href="/products">
          <Icon
name="mdi:sparkles"
size="1.125rem" />
          Explore Our Collection
        </AppButton>
        <AppButton
variant="secondary"
size="lg"
href="/contact">
          Get in Touch
        </AppButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at center,
      $brand-crimson 0%,
      $brand-crimson-dark 50%,
      $brand-maroon 100%);
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
}
</style>

<template>
  <section class="cta-banner">
    <FloatingHearts :count="12" />
    <div class="cta-banner__content">
      <h2 class="cta-banner__title">
        Ready to Create Something
        <span class="cta-banner__accent">Beautiful?</span>
      </h2>
      <p class="cta-banner__desc">
        Let us craft the perfect gift for your loved ones. Every order is made with passion and
        care.
      </p>
      <div class="cta-banner__actions">
        <AppButton
          variant="gold"
          size="lg"
          href="/contact"
        >
          <Icon
            name="mdi:heart"
            size="1rem"
          />
          Start Your Order
        </AppButton>
        <AppButton
          variant="secondary"
          size="lg"
          href="https://wa.me/919494521472"
        >
          <Icon
            name="mdi:whatsapp"
            size="1.125rem"
          />
          Chat with Us
        </AppButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.cta-banner {
  position: relative;
  padding: 5rem 1.5rem;
  text-align: center;
  background: radial-gradient(
    ellipse at center,
    $brand-crimson 0%,
    $brand-crimson-dark 60%,
    $brand-maroon 100%
  );
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

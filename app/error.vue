<template>
  <div class="error-page">
    <FloatingHearts :count="14" />

    <div class="error-page__content">
      <p class="error-page__code">
{{ error?.statusCode || 500 }}
</p>

      <h1 class="error-page__title">
        {{ is404 ? "This Page Wandered" : "Something Went" }}
        <span class="error-page__accent">{{ is404 ? "Away" : "Wrong" }}</span>
      </h1>

      <p class="error-page__desc">
        {{
          is404
            ? `The page you're looking for seems to have drifted off — like a letter lost in the wind. Let's guide you back
        home.`
            : `An unexpected hiccup happened on our end. Don't worry, every tale has a twist — let's get you back on track.`
        }}
      </p>

      <div class="error-page__actions">
        <AppButton
variant="gold"
size="lg"
@click="handleClearError('/')">
          <Icon
name="mdi:home-heart"
size="1.125rem" />
          Back to Home
        </AppButton>
        <AppButton
variant="secondary"
size="lg"
@click="handleClearError('/products')">
          <Icon
name="mdi:sparkles"
size="1.125rem" />
          Explore Collection
        </AppButton>
      </div>

      <p class="error-page__footer-note">
        Need help?
        <a
:href="contact.whatsappUrl"
target="_blank"
rel="noopener noreferrer"
class="error-page__link">
          Chat with us on WhatsApp
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const contact = useContactInfo()

const error = useError()

const is404 = computed(() => error.value?.statusCode === 404)

const handleClearError = async (path: string) => {
  await clearError({ redirect: path })
}
</script>

<style lang="scss" scoped>
.error-page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: radial-gradient(ellipse at center, $brand-crimson 0%, $brand-crimson-dark 50%, $brand-maroon 100%);
  overflow: hidden;
  padding: 2rem 1.5rem;

  &__content {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 36rem;
  }

  &__code {
    font-family: $font-display;
    font-size: 8rem;
    font-weight: 700;
    line-height: 1;
    color: rgba(255, 255, 255, 0.08);
    margin-bottom: -1rem;
    user-select: none;

    @include mobile {
      font-size: 5.5rem;
    }
  }

  &__title {
    font-family: $font-display;
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.25;
    margin-bottom: 1.25rem;

    @include tablet-down {
      font-size: 2rem;
    }

    @include mobile {
      font-size: 1.75rem;
    }
  }

  &__accent {
    display: block;
    font-family: $font-cursive;
    font-weight: 400;
    color: $brand-gold;
    font-size: 1.15em;
    margin-top: 0.15rem;
  }

  &__desc {
    font-family: $font-body;
    font-size: 1.0625rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.7;
    margin-bottom: 2.5rem;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2.5rem;
  }

  &__footer-note {
    font-family: $font-body;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.45);
  }

  &__link {
    color: $brand-gold;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: $brand-gold-light;
      text-decoration: underline;
    }
  }
}
</style>

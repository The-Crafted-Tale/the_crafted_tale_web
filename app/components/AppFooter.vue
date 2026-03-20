<template>
  <footer class="app-footer">
    <div class="app-footer__inner">
      <div class="app-footer__grid">
        <div class="app-footer__brand">
          <AppLogo size="sm" />
          <p class="app-footer__tagline">Your tale, to your loved ones</p>
          <p class="app-footer__desc">Every piece tells a story. We create personalized, handmade gifts that capture
            your most cherished moments and deliver them with care.</p>
        </div>

        <div class="app-footer__links-col">
          <h4 class="app-footer__col-title">Quick Links</h4>
          <nav class="app-footer__nav" aria-label="Footer navigation">
            <NuxtLink to="/" class="app-footer__link">Home</NuxtLink>
            <NuxtLink to="/products" class="app-footer__link">Products</NuxtLink>
            <NuxtLink to="/about" class="app-footer__link">About</NuxtLink>
            <NuxtLink to="/contact" class="app-footer__link">Contact</NuxtLink>
          </nav>
        </div>

        <div class="app-footer__contact-col">
          <h4 class="app-footer__col-title">Contact Us</h4>
          <div class="app-footer__contact-items">
            <a href="mailto:hello@thecraftedtale.shop" class="app-footer__contact-item">
              <Icon name="mdi:email-outline" size="1rem" />
              hello@thecraftedtale.shop
            </a>
            <a href="tel:+919494521472" class="app-footer__contact-item">
              <Icon name="mdi:phone-outline" size="1rem" />
              +91 94945 21472
            </a>
          </div>
        </div>

        <div class="app-footer__newsletter-col">
          <h4 class="app-footer__col-title">Stay Updated</h4>
          <p class="app-footer__newsletter-desc">Get the latest on new creations, offers, and heartfelt stories.</p>
          <form class="app-footer__newsletter" @submit.prevent="handleSubscribe">
            <input v-model="newsletterEmail" type="email" placeholder="Your email" class="app-footer__newsletter-input"
              aria-label="Email for newsletter"
              :disabled="newsletterState === 'loading' || newsletterState === 'success'" />
            <button type="submit" class="app-footer__newsletter-btn"
              :disabled="newsletterState === 'loading' || newsletterState === 'success'">
              {{ newsletterButtonText }}
            </button>
          </form>
          <p v-if="newsletterMessage"
            :class="['app-footer__newsletter-msg', { 'app-footer__newsletter-msg--error': newsletterState === 'error' }]">
            {{ newsletterMessage }}
          </p>
        </div>
      </div>

      <div class="app-footer__social">
        <SocialItems />
      </div>

      <div class="app-footer__bottom">
        <p class="app-footer__copy">&copy; {{ currentYear }} The Crafted Tale. All rights reserved.</p>
        <div class="app-footer__legal">
          <NuxtLink to="/privacy" class="app-footer__legal-link">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms" class="app-footer__legal-link">Terms of Service</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const newsletterEmail = ref("")
const newsletterState = ref<"idle" | "loading" | "success" | "error">("idle")
const newsletterMessage = ref("")

const newsletterButtonText = computed(() => {
  if (newsletterState.value === "loading") return "Sending..."
  if (newsletterState.value === "success") return "Subscribed!"
  return "Subscribe"
})

async function handleSubscribe() {
  const email = newsletterEmail.value.trim()
  if (!email) return

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newsletterState.value = "error"
    newsletterMessage.value = "Please enter a valid email address."
    return
  }

  newsletterState.value = "loading"
  newsletterMessage.value = ""

  try {
    await $fetch("/api/waitlist", {
      method: "POST",
      body: { channel: "email", value: email },
    })
    newsletterState.value = "success"
    newsletterMessage.value = "Thank you for subscribing!"
  } catch {
    newsletterState.value = "error"
    newsletterMessage.value = "Something went wrong. Please try again."
  }
}
</script>

<style lang="scss" scoped>
.app-footer {
  background: linear-gradient(180deg, $brand-crimson 0%, $brand-crimson-dark 100%);
  color: rgba(255, 255, 255, 0.85);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, $brand-gold, $brand-rose, $brand-gold);
  }

  &__inner {
    max-width: 72rem;
    margin: 0 auto;
    padding: 3.5rem 1.5rem 2rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1.25fr;
    gap: 2.5rem;
    margin-bottom: 2.5rem;

    @include desktop-down {
      grid-template-columns: 1fr 1fr;
    }

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__brand {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  &__tagline {
    font-family: $font-display;
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.7);
    font-style: italic;
  }

  &__desc {
    font-size: 0.875rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.6);
  }

  &__col-title {
    font-family: $font-display;
    font-size: 1.0625rem;
    font-weight: 600;
    color: #fff;
    margin-bottom: 1rem;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__link {
    font-family: $font-body;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;
    transition:
      color 0.2s ease,
      padding-left 0.2s ease;

    &:hover {
      color: $brand-gold;
      padding-left: 0.25rem;
    }
  }

  &__contact-items {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: $brand-gold;
    }
  }

  &__newsletter-desc {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  &__newsletter {
    display: flex;
    gap: 0;
  }

  &__newsletter-input {
    flex: 1;
    padding: 0.625rem 0.875rem;
    font-family: $font-body;
    font-size: 0.875rem;
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-right: none;
    border-radius: 0.5rem 0 0 0.5rem;
    outline: none;
    transition:
      background 0.2s,
      border-color 0.2s;

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    &:focus {
      background: rgba(255, 255, 255, 0.15);
      border-color: $brand-gold;
    }
  }

  &__newsletter-btn {
    padding: 0.625rem 1.25rem;
    font-family: $font-body;
    font-size: 0.875rem;
    font-weight: 600;
    color: $brand-crimson-dark;
    background: $brand-gold;
    border: none;
    border-radius: 0 0.5rem 0.5rem 0;
    cursor: pointer;
    transition:
      background 0.2s,
      transform 0.15s;
    white-space: nowrap;

    &:hover:not(:disabled) {
      background: $brand-gold-light;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }

  &__newsletter-msg {
    font-size: 0.8125rem;
    color: $brand-gold-light;
    margin-top: 0.5rem;

    &--error {
      color: #fca5a5;
    }
  }

  &__social {
    display: flex;
    justify-content: center;
    padding-bottom: 2rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;

    @include mobile {
      flex-direction: column;
      text-align: center;
    }
  }

  &__copy {
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.45);
  }

  &__legal {
    display: flex;
    gap: 1.5rem;
  }

  &__legal-link {
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.45);
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: rgba(255, 255, 255, 0.75);
    }
  }
}
</style>

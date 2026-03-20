<template>
  <div class="contact-page">
    <section class="contact-page__hero">
      <FloatingHearts :count="8" />
      <div class="contact-page__hero-inner">
        <span class="section-label section-label--light">GET IN TOUCH</span>
        <h1 class="section-title section-title--light">
          Let's Create
          <span class="section-title__accent">Together</span>
        </h1>
        <p class="contact-page__hero-desc">
          Have a question, a custom request, or just want to say hello? We'd
          love to hear from you.
        </p>
      </div>
    </section>

    <section class="contact-page__content">
      <div class="contact-page__inner">
        <div class="contact-page__form-side">
          <div v-if="submitted" class="contact-page__success">
            <div class="contact-page__success-icon">
              <Icon name="mdi:check-circle-outline" size="3rem" />
            </div>
            <h2 class="contact-page__success-title">Message Sent!</h2>
            <p class="contact-page__success-desc">
              Thank you for reaching out. We'll get back to you as soon as
              possible.
            </p>
            <div class="contact-page__success-actions">
              <AppButton variant="primary" href="/products">
                Browse Products
              </AppButton>
              <p class="contact-page__success-alt">
                Or reach us directly on
                <a :href="contact.whatsappUrlWithMessage('Hi, I have a question!')" target="_blank"
                  rel="noopener noreferrer">
                  WhatsApp
                </a>
              </p>
            </div>
          </div>
          <template v-else>
            <h2 class="contact-page__form-title">Send Us a Message</h2>
            <p class="contact-page__form-desc">
              Fill in the form below and we'll respond within 24 hours.
            </p>
            <ContactForm v-model:loading="formLoading" :prefill-product="prefillProductName"
              @submit="handleFormSubmit" />
          </template>
        </div>

        <aside class="contact-page__info-side">
          <div class="contact-page__info-card">
            <h3 class="contact-page__info-heading">Other Ways to Reach Us</h3>

            <div class="contact-page__info-item">
              <div class="contact-page__info-icon">
                <Icon name="mdi:whatsapp" size="1.25rem" />
              </div>
              <div>
                <p class="contact-page__info-label">WhatsApp</p>
                <a :href="contact.whatsappUrl" target="_blank" rel="noopener noreferrer"
                  class="contact-page__info-value contact-page__info-value--link">
                  {{ contact.phoneFormatted }}
                </a>
              </div>
            </div>

            <div class="contact-page__info-item">
              <div class="contact-page__info-icon">
                <Icon name="mdi:email-outline" size="1.25rem" />
              </div>
              <div>
                <p class="contact-page__info-label">Email</p>
                <a :href="contact.mailtoUrl" class="contact-page__info-value contact-page__info-value--link">
                  {{ contact.email }}
                </a>
              </div>
            </div>

            <div class="contact-page__info-item">
              <div class="contact-page__info-icon">
                <Icon name="mdi:instagram" size="1.25rem" />
              </div>
              <div>
                <p class="contact-page__info-label">Instagram</p>
                <a :href="contact.instagram" target="_blank" rel="noopener noreferrer"
                  class="contact-page__info-value contact-page__info-value--link">
                  {{ contact.instagramHandle }}
                </a>
              </div>
            </div>
          </div>

          <div class="contact-page__info-card contact-page__info-card--highlight">
            <div class="contact-page__info-card-icon">
              <Icon name="mdi:clock-outline" size="1.5rem" />
            </div>
            <h3 class="contact-page__info-heading">Response Time</h3>
            <p class="contact-page__info-note">
              We typically respond within 24 hours. For urgent inquiries, reach
              out on WhatsApp for a faster reply.
            </p>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const contact = useContactInfo()

useSeoMeta({
  title: 'Contact | The Crafted Tale',
  description:
    'Get in touch with The Crafted Tale for custom orders, inquiries, or to say hello. We respond within 24 hours.',
})

const route = useRoute()
const { getProductBySlug } = useProducts()

const formLoading = ref(false)
const submitted = ref(false)

const prefillProductName = computed(() => {
  const slug = route.query.product as string | undefined
  if (!slug) return undefined
  return getProductBySlug(slug)?.name
})

function handleFormSubmit(_payload: {
  name: string
  email: string
  phone: string
  message: string
}) {
  formLoading.value = true
  // Simulated submission — will connect to POST /api/contact once the server layer is implemented
  setTimeout(() => {
    formLoading.value = false
    submitted.value = true
  }, 1200)
}
</script>

<style lang="scss" scoped>
.contact-page {
  &__hero {
    position: relative;
    padding: 6rem 1.5rem 4rem;
    text-align: center;
    background: radial-gradient(ellipse at center,
        $brand-crimson 0%,
        $brand-crimson-dark 60%,
        $brand-maroon 100%);
    overflow: hidden;
  }

  &__hero-inner {
    position: relative;
    z-index: 1;
    max-width: 40rem;
    margin: 0 auto;
  }

  &__hero-desc {
    font-size: 1.0625rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.7;
  }

  // ---- Content ----
  &__content {
    padding: 4rem 1.5rem 5rem;
    background: $brand-bg;
  }

  &__inner {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 3.5rem;
    max-width: 68rem;
    margin: 0 auto;
    align-items: start;

    @include tablet-down {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  // ---- Form side ----
  &__form-side {
    display: flex;
    flex-direction: column;
  }

  &__form-title {
    font-family: $font-display;
    font-size: 1.75rem;
    font-weight: 700;
    color: $text-primary;
    margin-bottom: 0.5rem;
  }

  &__form-desc {
    font-size: 1rem;
    color: $text-muted;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  // ---- Success state ----
  &__success {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 3rem 1.5rem;
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 0.125rem 0.75rem rgba($brand-red-dark, 0.06);
  }

  &__success-icon {
    color: $success;
    margin-bottom: 1rem;
  }

  &__success-title {
    font-family: $font-display;
    font-size: 1.75rem;
    font-weight: 700;
    color: $text-primary;
    margin-bottom: 0.5rem;
  }

  &__success-desc {
    font-size: 1rem;
    color: $text-muted;
    line-height: 1.6;
    max-width: 24rem;
    margin-bottom: 2rem;
  }

  &__success-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  &__success-alt {
    font-size: 0.875rem;
    color: $text-muted;

    a {
      color: $brand-rose;
      font-weight: 600;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  // ---- Info side ----
  &__info-side {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @include tablet-down {
      order: -1;
    }
  }

  &__info-card {
    background: #fff;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 0.125rem 0.75rem rgba($brand-red-dark, 0.06);

    &--highlight {
      background: $brand-bg-blush;
      text-align: center;
    }
  }

  &__info-card-icon {
    color: $brand-crimson;
    margin-bottom: 0.75rem;
  }

  &__info-heading {
    font-family: $font-body;
    font-size: 1.125rem;
    font-weight: 700;
    color: $text-primary;
    margin-bottom: 1.25rem;
  }

  &__info-item {
    display: flex;
    gap: 0.875rem;
    align-items: flex-start;

    &+& {
      margin-top: 1.25rem;
      padding-top: 1.25rem;
      border-top: 1px solid $border;
    }
  }

  &__info-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    background: $brand-bg-deep;
    color: $brand-crimson;
  }

  &__info-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $text-muted;
    margin-bottom: 0.125rem;
  }

  &__info-value {
    font-size: 0.9375rem;
    color: $text-primary;
    font-weight: 500;

    &--link {
      text-decoration: none;
      color: $brand-rose;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  &__info-note {
    font-size: 0.9375rem;
    color: $text-secondary;
    line-height: 1.65;
  }
}
</style>

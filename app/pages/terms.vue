<template>
  <div class="terms-page">
    <section class="terms-page__hero">
      <FloatingHearts :count="6" />
      <div class="terms-page__hero-inner">
        <span class="section-label section-label--light">OUR AGREEMENT</span>
        <h1 class="section-title section-title--light">
          Terms of
          <span class="section-title__accent">Service</span>
        </h1>
        <p class="terms-page__hero-desc">
          Please read these terms carefully before using our website or placing
          an order with The Crafted Tale.
        </p>
      </div>
    </section>

    <section class="terms-page__content">
      <div class="terms-page__inner">
        <p class="terms-page__updated">
          Last updated: {{ lastUpdated }}
        </p>

        <div v-for="section in sections" :key="section.title" class="terms-page__section">
          <div class="terms-page__section-header">
            <div class="terms-page__section-icon">
              <Icon :name="section.icon" size="1.25rem" />
            </div>
            <h2 class="terms-page__section-title">{{ section.title }}</h2>
          </div>
          <div class="terms-page__section-body">
            <p v-for="(paragraph, idx) in section.paragraphs" :key="idx" class="terms-page__text">
              {{ paragraph }}
            </p>
            <ul v-if="section.list" class="terms-page__list">
              <li v-for="(item, idx) in section.list" :key="idx">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <div class="terms-page__contact-box">
          <Icon name="mdi:chat-question-outline" size="1.5rem" />
          <div>
            <h3 class="terms-page__contact-title">Have questions about these terms?</h3>
            <p class="terms-page__contact-desc">
              Reach out to us at
              <a :href="contact.mailtoUrl">{{ contact.email }}</a>
              or visit our
              <NuxtLink to="/contact">contact page</NuxtLink>.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const contact = useContactInfo()

useSeoMeta({
  title: 'Terms of Service | The Crafted Tale',
  description:
    'Read the terms and conditions for using The Crafted Tale website and placing orders for our handmade gifts.',
})

const lastUpdated = 'March 20, 2026'

const sections = [
  {
    icon: 'mdi:file-document-outline',
    title: 'Overview',
    paragraphs: [
      'Welcome to The Crafted Tale. By accessing our website and using our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.',
      'The Crafted Tale is a handmade gifts business that creates bespoke, personalized products. These terms govern your use of our website and any orders or inquiries you place with us.',
    ],
  },
  {
    icon: 'mdi:shopping-outline',
    title: 'Products & Orders',
    paragraphs: [
      'All products displayed on our website are handmade and may vary slightly from the images shown. Minor variations in color, texture, or size are a natural part of the handcrafting process and add to the uniqueness of each piece.',
    ],
    list: [
      'Product images are representative; the final product may have slight handmade variations',
      'Prices listed are in Indian Rupees (INR) and are subject to change without prior notice',
      'Placing an inquiry or order does not guarantee availability — we will confirm via WhatsApp or email',
      'Custom and semi-custom orders require discussion and approval of the design before production begins',
    ],
  },
  {
    icon: 'mdi:hand-coin-outline',
    title: 'Pricing & Payment',
    paragraphs: [
      'All prices are displayed in Indian Rupees (INR). Payment details and methods will be communicated during the order confirmation process. Currently, payment is handled offline through direct communication.',
      'For custom orders, the final price may differ from the estimate depending on the complexity and materials required. We will always confirm the price with you before proceeding.',
    ],
  },
  {
    icon: 'mdi:truck-delivery-outline',
    title: 'Shipping & Delivery',
    paragraphs: [
      'Since each product is handmade, delivery timelines vary depending on the complexity of the order. We will provide an estimated delivery timeline at the time of order confirmation.',
    ],
    list: [
      'Ready-made products are typically shipped within 3–5 business days',
      'Custom and semi-custom orders may take 7–15 business days depending on complexity',
      'Shipping charges, if applicable, will be communicated before order confirmation',
      'We take great care in packaging to ensure your gift arrives in perfect condition',
    ],
  },
  {
    icon: 'mdi:swap-horizontal',
    title: 'Cancellations & Returns',
    paragraphs: [
      'Due to the handmade and personalized nature of our products, our cancellation and return policies are as follows:',
    ],
    list: [
      'Ready-made products may be returned within 7 days of delivery if they arrive damaged or defective',
      'Custom and semi-custom orders cannot be cancelled once production has started',
      'If a product arrives damaged, please contact us within 48 hours with photos and we will arrange a replacement',
      'Refunds, when applicable, will be processed through the original payment method',
    ],
  },
  {
    icon: 'mdi:creative-commons',
    title: 'Intellectual Property',
    paragraphs: [
      'All content on this website — including product designs, images, text, logos, and graphics — is the intellectual property of The Crafted Tale and is protected by applicable laws. You may not reproduce, distribute, or use any content from this website without our prior written consent.',
      'Product photos shared on our website and social media are of our original work. If you wish to share them, please credit The Crafted Tale appropriately.',
    ],
  },
  {
    icon: 'mdi:web',
    title: 'Website Use',
    paragraphs: [
      'You agree to use our website only for lawful purposes. You must not use our site in any way that could damage, disable, or impair the site or interfere with any other party\'s use of the site.',
    ],
    list: [
      'You must not attempt to gain unauthorized access to any part of the website',
      'You must not use the website to transmit any harmful or malicious content',
      'We reserve the right to restrict access to parts of the website at our discretion',
    ],
  },
  {
    icon: 'mdi:shield-alert-outline',
    title: 'Limitation of Liability',
    paragraphs: [
      'The Crafted Tale provides this website and its content on an "as is" basis. While we strive to keep information accurate and up to date, we make no warranties about the completeness, reliability, or accuracy of the information.',
      'To the maximum extent permitted by law, The Crafted Tale shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products.',
    ],
  },
  {
    icon: 'mdi:update',
    title: 'Changes to These Terms',
    paragraphs: [
      'We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Your continued use of the website after changes constitutes acceptance of the updated terms.',
      'We encourage you to review this page periodically to stay informed.',
    ],
  },
]
</script>

<style lang="scss" scoped>
.terms-page {
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

  &__content {
    padding: 4rem 1.5rem 5rem;
    background: $brand-bg;
  }

  &__inner {
    max-width: 48rem;
    margin: 0 auto;
  }

  &__updated {
    font-size: 0.875rem;
    color: $text-muted;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid $border;
  }

  &__section {
    margin-bottom: 2.5rem;
  }

  &__section-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  &__section-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
    background: $brand-bg-deep;
    border-radius: 0.5rem;
    color: $brand-crimson;
  }

  &__section-title {
    font-family: $font-display;
    font-size: 1.375rem;
    font-weight: 700;
    color: $text-primary;
  }

  &__section-body {
    padding-left: 3.25rem;

    @include mobile {
      padding-left: 0;
    }
  }

  &__text {
    font-size: 1rem;
    color: $text-secondary;
    line-height: 1.8;
    margin-bottom: 0.75rem;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0.75rem 0 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    li {
      position: relative;
      padding-left: 1.25rem;
      font-size: 0.9375rem;
      color: $text-secondary;
      line-height: 1.7;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.55em;
        width: 0.375rem;
        height: 0.375rem;
        background: $brand-rose;
        border-radius: 50%;
      }
    }
  }

  &__contact-box {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-top: 3rem;
    padding: 1.5rem;
    background: $brand-bg-blush;
    border-radius: 1rem;
    color: $brand-crimson;
  }

  &__contact-title {
    font-family: $font-body;
    font-size: 1rem;
    font-weight: 700;
    color: $text-primary;
    margin-bottom: 0.25rem;
  }

  &__contact-desc {
    font-size: 0.9375rem;
    color: $text-secondary;
    line-height: 1.6;

    a {
      color: $brand-rose;
      font-weight: 600;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>

<template>
  <div class="privacy-page">
    <PageHero label="YOUR PRIVACY MATTERS" title="Privacy" accent="Policy"
      description="We value your trust and are committed to protecting the personal information you share with us." />

    <section class="privacy-page__content">
      <div class="privacy-page__inner">
        <p class="privacy-page__updated">
          Last updated: {{ lastUpdated }}
        </p>

        <div v-for="section in sections" :key="section.title" class="privacy-page__section">
          <div class="privacy-page__section-header">
            <div class="privacy-page__section-icon">
              <Icon :name="section.icon" size="1.25rem" />
            </div>
            <h2 class="privacy-page__section-title">{{ section.title }}</h2>
          </div>
          <div class="privacy-page__section-body">
            <p v-for="(paragraph, idx) in section.paragraphs" :key="idx" class="privacy-page__text">
              {{ paragraph }}
            </p>
            <ul v-if="section.list" class="privacy-page__list">
              <li v-for="(item, idx) in section.list" :key="idx">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <div class="privacy-page__contact-box">
          <Icon name="mdi:email-heart-outline" size="1.5rem" />
          <div>
            <h3 class="privacy-page__contact-title">Questions about your privacy?</h3>
            <p class="privacy-page__contact-desc">
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
  title: 'Privacy Policy | The Crafted Tale',
  description:
    'Learn how The Crafted Tale collects, uses, and protects your personal information when you visit our website.',
})

const lastUpdated = 'March 20, 2026'

const sections = [
  {
    icon: 'mdi:database-outline',
    title: 'Information We Collect',
    paragraphs: [
      'When you interact with The Crafted Tale, we may collect information that you voluntarily provide to us. This includes details you share through our contact form, newsletter signup, or WhatsApp conversations.',
    ],
    list: [
      'Name, email address, and phone number when you submit a contact form or inquiry',
      'Email address when you subscribe to our newsletter',
      'Product preferences and customization details when you place a custom order request',
      'Messages and communication history from inquiries',
    ],
  },
  {
    icon: 'mdi:shield-check-outline',
    title: 'How We Use Your Information',
    paragraphs: [
      'We use the information we collect solely to serve you better and operate our business. We do not sell, rent, or trade your personal information to third parties.',
    ],
    list: [
      'Responding to your inquiries and order requests',
      'Sending updates about your orders or custom creations',
      'Delivering our newsletter if you have opted in',
      'Improving our website and the products we offer',
    ],
  },
  {
    icon: 'mdi:cookie-outline',
    title: 'Cookies & Analytics',
    paragraphs: [
      'Our website may use essential cookies to ensure basic functionality. We do not use advertising cookies or invasive tracking technologies.',
      'We may use privacy-friendly analytics to understand how visitors use our site, helping us improve your experience. This data is aggregated and does not identify you personally.',
    ],
  },
  {
    icon: 'mdi:share-variant-outline',
    title: 'Third-Party Services',
    paragraphs: [
      'We use a limited number of trusted third-party services to operate our website and communicate with you.',
    ],
    list: [
      'Supabase — for securely storing contact form submissions and newsletter signups',
      'WhatsApp (Meta) — when you choose to message us directly via WhatsApp',
      'Instagram (Meta) — our social media presence where we share our work',
    ],
  },
  {
    icon: 'mdi:lock-outline',
    title: 'Data Security',
    paragraphs: [
      'We take reasonable measures to protect your personal information from unauthorized access, alteration, or disclosure. Our data is stored in secure, encrypted databases. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    icon: 'mdi:account-check-outline',
    title: 'Your Rights',
    paragraphs: [
      'You have the right to access, correct, or request deletion of any personal information we hold about you. If you wish to unsubscribe from our newsletter, you can do so at any time using the link in the email or by contacting us directly.',
      'To exercise any of these rights, simply reach out to us via email or our contact form.',
    ],
  },
  {
    icon: 'mdi:update',
    title: 'Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. When we do, we will update the "Last updated" date at the top of this page. We encourage you to review this page periodically.',
    ],
  },
]
</script>

<style lang="scss" scoped>
.privacy-page {
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

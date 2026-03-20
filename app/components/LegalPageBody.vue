<template>
  <section class="legal-body">
    <div class="legal-body__inner">
      <p class="legal-body__updated">
        Last updated: {{ lastUpdated }}
      </p>

      <div v-for="section in sections" :key="section.title" class="legal-body__section">
        <div class="legal-body__section-header">
          <div class="legal-body__section-icon">
            <Icon :name="section.icon" size="1.25rem" />
          </div>
          <h2 class="legal-body__section-title">{{ section.title }}</h2>
        </div>
        <div class="legal-body__section-body">
          <p v-for="(paragraph, idx) in section.paragraphs" :key="idx" class="legal-body__text">
            {{ paragraph }}
          </p>
          <ul v-if="section.list" class="legal-body__list">
            <li v-for="(item, idx) in section.list" :key="idx">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <div class="legal-body__contact-box">
        <Icon :name="contactIcon" size="1.5rem" />
        <div>
          <h3 class="legal-body__contact-title">{{ contactTitle }}</h3>
          <p class="legal-body__contact-desc">
            Reach out to us at
            <a :href="contact.mailtoUrl">{{ contact.email }}</a>
            or visit our
            <NuxtLink to="/contact">contact page</NuxtLink>.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface LegalSection {
  icon: string
  title: string
  paragraphs: string[]
  list?: string[]
}

defineProps<{
  lastUpdated: string
  sections: LegalSection[]
  contactIcon: string
  contactTitle: string
}>()

const contact = useContactInfo()
</script>

<style lang="scss" scoped>
.legal-body {
  padding: 4rem 1.5rem 5rem;
  background: $brand-bg;

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

<template>
  <component :is="href ? resolveComponent('NuxtLink') : 'button'" :to="href || undefined"
    :href="href && isExternal ? href : undefined" :target="href && isExternal ? '_blank' : undefined"
    :rel="href && isExternal ? 'noopener noreferrer' : undefined" :disabled="disabled || loading"
    :class="['app-btn', `app-btn--${variant}`, `app-btn--${size}`]">

    <span v-if="loading" class="app-btn__spinner" aria-hidden="true" />

    <slot />

  </component>
</template>

<script setup lang="ts">
import { resolveComponent } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
})

const isExternal = computed(() =>
  props.href?.startsWith('http') || props.href?.startsWith('//')
)
</script>

<style lang="scss" scoped>
.app-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: $font-body;
  font-weight: 600;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.15s, box-shadow 0.2s, background-color 0.2s, color 0.2s;
  white-space: nowrap;
  letter-spacing: 0.01em;

  &:disabled,
  &[disabled] {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &--primary {
    color: #fff;
    background: linear-gradient(135deg, $brand-rose 0%, $brand-red-dark 100%);
    box-shadow: 0 0.125rem 0.5rem rgba($brand-red-dark, 0.3);

    &:hover:not(:disabled) {
      box-shadow: 0 0.375rem 1.25rem rgba($brand-red-dark, 0.45);
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &--secondary {
    color: #fff;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.7);

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.12);
      border-color: #fff;
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &--ghost {
    color: $brand-rose;
    background: transparent;

    &:hover:not(:disabled) {
      background: rgba($brand-rose, 0.08);
    }
  }

  &--gold {
    color: $brand-crimson-dark;
    background: linear-gradient(135deg, $brand-gold-light 0%, $brand-gold 100%);
    box-shadow: 0 0.125rem 0.5rem rgba($brand-gold, 0.3);

    &:hover:not(:disabled) {
      box-shadow: 0 0.375rem 1.25rem rgba($brand-gold, 0.45);
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &--sm {
    font-size: 0.8125rem;
    padding: 0.5rem 1.25rem;
  }

  &--md {
    font-size: 0.9375rem;
    padding: 0.75rem 1.75rem;
  }

  &--lg {
    font-size: 1.0625rem;
    padding: 0.875rem 2.25rem;
  }

  &__spinner {
    width: 1em;
    height: 1em;
    border: 0.125rem solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: btn-spin 0.6s linear infinite;
  }
}

@keyframes btn-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

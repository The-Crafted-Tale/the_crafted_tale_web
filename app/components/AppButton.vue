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
  variant?: 'primary' | 'secondary' | 'ghost'
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
  border-radius: 0.5rem;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.15s, box-shadow 0.2s, background-color 0.2s, color 0.2s;
  white-space: nowrap;

  &:disabled,
  &[disabled] {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  // --- variants ---

  &--primary {
    color: #fff;
    background: linear-gradient(135deg, $brand-red 0%, $brand-red-dark 100%);

    &:hover:not(:disabled) {
      box-shadow: 0 0.25rem 0.75rem rgba($brand-red, 0.4);
      transform: translateY(-0.0625rem);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &--secondary {
    color: $brand-red;
    background: transparent;
    border: 0.09375rem solid $brand-red;

    &:hover:not(:disabled) {
      background: rgba($brand-red, 0.08);
      transform: translateY(-0.0625rem);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &--ghost {
    color: $brand-red;
    background: transparent;

    &:hover:not(:disabled) {
      background: rgba($brand-red, 0.08);
    }
  }

  // --- sizes ---

  &--sm {
    font-size: 0.8125rem;
    padding: 0.375rem 0.875rem;
  }

  &--md {
    font-size: 0.9375rem;
    padding: 0.625rem 1.25rem;
  }

  &--lg {
    font-size: 1.0625rem;
    padding: 0.75rem 1.75rem;
  }

  // --- spinner ---

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

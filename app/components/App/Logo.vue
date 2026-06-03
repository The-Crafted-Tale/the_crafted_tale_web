<template>
  <img :src="logo" alt="The Crafted Tale" :class="['app-logo', `app-logo--${size}`]" />
</template>

<script setup lang="ts">
import logo from '~/assets/images/logo.svg';

defineOptions({ name: 'AppLogo' })

withDefaults(defineProps<Props>(), {
  size: 'md',
})

interface Props {
  size?: 'sm' | 'md' | 'lg'
}
</script>

<style lang="scss" scoped>
.app-logo {
  display: block;
  height: auto;
  width: auto;

  &--sm {
    height: 2rem;
  }

  &--md {
    height: 3.5rem;
  }

  &--lg {
    height: 5rem;
  }
}
</style>

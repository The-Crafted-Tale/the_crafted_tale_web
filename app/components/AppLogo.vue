<template>
  <img
:src="logo"
alt="The Crafted Tale"
:class="['app-logo', `app-logo--${size}`]" />
</template>

<script setup lang="ts">
import logo from '~/assets/images/logo.svg'

interface Props {
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  size: 'md',
})
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

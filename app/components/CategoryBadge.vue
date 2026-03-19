<template>
  <span :class="['badge', `badge--${category}`]">{{ displayLabel }}</span>
</template>

<script setup lang="ts">
interface Props {
  category: 'custom' | 'semi_custom' | 'ready_made'
}

const props = defineProps<Props>()

const labelMap: Record<Props['category'], string> = {
  custom: 'Custom',
  semi_custom: 'Semi Custom',
  ready_made: 'Ready Made',
}

const displayLabel = computed(() => labelMap[props.category])
</script>

<style lang="scss" scoped>
.badge {
  display: inline-block;
  font-family: $font-body;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.625rem;
  border-radius: 62.5rem;
  white-space: nowrap;
  line-height: 1.4;

  &--custom {
    color: $badge-custom-fg;
    background: $badge-custom-bg;
  }

  &--semi_custom {
    color: $badge-semi-custom-fg;
    background: $badge-semi-custom-bg;
  }

  &--ready_made {
    color: $badge-ready-made-fg;
    background: $badge-ready-made-bg;
  }
}
</style>

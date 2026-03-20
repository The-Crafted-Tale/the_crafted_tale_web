<template>
  <div class="floating-hearts" aria-hidden="true">
    <span v-for="heart in hearts" :key="heart.id" class="floating-hearts__heart" :style="heart.style">&#10084;</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 15,
})

const hearts = computed(() =>
  Array.from({ length: props.count }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${0.75 + Math.random() * 2}rem`,
      opacity: 0.06 + Math.random() * 0.12,
      animationDuration: `${6 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 8}s`,
    },
  }))
)
</script>

<style lang="scss" scoped>
.floating-hearts {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;

  &__heart {
    position: absolute;
    color: rgba(255, 255, 255, 0.15);
    animation: heart-float linear infinite;
    will-change: transform, opacity;
  }
}

@keyframes heart-float {
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: var(--start-opacity, 0.08);
  }

  50% {
    transform: translateY(-30px) rotate(15deg) scale(1.15);
    opacity: var(--mid-opacity, 0.15);
  }

  100% {
    transform: translateY(0) rotate(-10deg) scale(1);
    opacity: var(--start-opacity, 0.08);
  }
}
</style>

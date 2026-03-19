<template>
  <span class="price">Rs. {{ formatted }}</span>
</template>

<script setup lang="ts">
interface Props {
  amount: number
}

const props = defineProps<Props>()

const formatted = computed(() => {
  return new Intl.NumberFormat('en-IN').format(props.amount)
})
</script>

<style lang="scss" scoped>
.price {
  font-family: $font-display;
  font-size: 1.125rem;
  font-weight: 700;
  color: $text-primary;
  white-space: nowrap;
}
</style>

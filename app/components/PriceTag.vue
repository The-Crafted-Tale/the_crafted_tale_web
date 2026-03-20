<template>
  <span class="price">
    <span class="price__from">From</span>
    Rs. {{ formatted }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  amount: number
}

const props = defineProps<Props>()

const formatted = computed(() => {
  return new Intl.NumberFormat("en-IN").format(props.amount)
})
</script>

<style lang="scss" scoped>
.price {
  font-family: $font-body;
  font-size: 1rem;
  font-weight: 700;
  color: $brand-rose;
  white-space: nowrap;

  &__from {
    font-weight: 400;
    font-size: 0.8125rem;
    color: $text-muted;
  }
}
</style>

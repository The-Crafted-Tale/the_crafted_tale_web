<template>
  <div class="og">
    <div class="og__frame">
      <p class="og__eyebrow">
        The Crafted Tale
      </p>
      <h1 class="og__title">
        {{ title }}
      </h1>
      <p
        v-if="description"
        class="og__description">
        {{ truncated }}
      </p>
      <p class="og__footer">
        thecraftedtale.com · Handmade with love in India
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Rendered by nuxt-og-image (satori) into the 1200×630 social card for every
 * page. Satori supports a subset of CSS — flexbox and absolute values only, no
 * grid, no CSS variables, no SCSS tokens — so the brand colours are inlined here
 * rather than pulled from `_variables.scss`.
 */
const props = withDefaults(
  defineProps<{ title?: string, description?: string }>(),
  {
    title: 'Handmade Gifts, Delivered with Love',
    description: '',
  },
)

const truncated = computed(() =>
  props.description.length > 140
    ? `${props.description.slice(0, 137).trimEnd()}…`
    : props.description,
)
</script>

<style scoped>
.og {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 48px;
  background-image: linear-gradient(135deg, #5d0f28 0%, #8b1a3a 100%);
}

.og__frame {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 56px 64px;
  border: 2px solid rgb(255 255 255 / 35%);
  border-radius: 24px;
}

.og__eyebrow {
  margin: 0 0 24px;
  font-family: "Great Vibes", cursive;
  font-size: 44px;
  color: #f3d9a4;
}

.og__title {
  margin: 0;
  font-family: "Playfair Display", serif;
  font-size: 68px;
  font-weight: 700;
  line-height: 1.15;
  color: #fff;
}

.og__description {
  margin: 24px 0 0;
  font-family: "Poppins", sans-serif;
  font-size: 28px;
  line-height: 1.45;
  color: rgb(255 255 255 / 82%);
}

.og__footer {
  margin: auto 0 0;
  font-family: "Poppins", sans-serif;
  font-size: 22px;
  color: rgb(255 255 255 / 65%);
}
</style>

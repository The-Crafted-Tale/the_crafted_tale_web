<template>
  <nav class="social" aria-label="Social links">
    <a v-for="link in socialLinks" :key="link.name" :href="link.href" target="_blank" rel="noopener noreferrer"
      class="social-link" :aria-label="link.label">
      <Icon :name="link.icon" size="1.5rem" />
    </a>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  instagram?: string
  facebook?: string
  youtube?: string
}>()

const socialLinks = computed(() => [
  { name: 'instagram', label: 'Instagram', icon: 'mdi:instagram', href: props.instagram || 'https://instagram.com/thecraftedtale.shop' },
  { name: 'facebook', label: 'Facebook', icon: 'mdi:facebook', href: props.facebook || 'https://facebook.com/thecraftedtale.shop' },
  { name: 'youtube', label: 'YouTube', icon: 'mdi:youtube', href: props.youtube || 'https://youtube.com/thecraftedtale.shop' },
])
</script>

<style scoped>
.social {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  color: #6b7280;
  border-radius: 50%;
  transition: color 0.2s ease, background-color 0.2s ease, transform 0.15s ease;
}

.social-link:hover {
  color: #c97b84;
  background-color: rgba(201, 123, 132, 0.12);
  transform: translateY(-2px);
}
</style>

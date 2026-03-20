<template>
  <nav class="social" aria-label="Social links">
    <a v-for="link in socialLinks" :key="link.name" :href="link.href" target="_blank" rel="noopener noreferrer"
      class="social__link" :aria-label="link.label">
      <Icon :name="link.icon" size="1.25rem" />
    </a>
  </nav>
</template>

<script setup lang="ts">
const contact = useContactInfo()

const socialLinks = [
  {
    name: "instagram",
    label: "Instagram",
    icon: "mdi:instagram",
    href: contact.instagram,
  },
  {
    name: "facebook",
    label: "Facebook",
    icon: "mdi:facebook",
    href: contact.facebook,
  },
  {
    name: "youtube",
    label: "YouTube",
    icon: "mdi:youtube",
    href: contact.youtube,
  },
]
</script>

<style lang="scss" scoped>
.social {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    text-decoration: none;
    transition:
      color 0.2s ease,
      background-color 0.2s ease,
      transform 0.15s ease;

    &:hover {
      color: $brand-gold;
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }
  }
}
</style>

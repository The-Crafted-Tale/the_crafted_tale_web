<template>
  <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="whatsapp-float" aria-label="Chat on WhatsApp">
    <Icon name="mdi:whatsapp" size="1.75rem" />
  </a>
</template>

<script setup lang="ts">
interface Props {
  phone?: string
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  phone: "+919494521472",
  message: "Hi, I'm interested in your products!",
})

const whatsappUrl = computed(() => `https://wa.me/${props.phone}?text=${encodeURIComponent(props.message)}`)
</script>

<style lang="scss" scoped>
.whatsapp-float {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  background: #25d366;
  color: #fff;
  border-radius: 50%;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.18);
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  animation: whatsapp-enter 0.5s ease both;
  animation-delay: 1s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0.375rem 1.25rem rgba(0, 0, 0, 0.24);
  }

  &:active {
    transform: scale(0.95);
  }

  @include tablet-down {
    bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px));
  }
}

@keyframes whatsapp-enter {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <NuxtLink to="/" class="app-header__logo-link">
        <AppLogo size="sm" />
      </NuxtLink>

      <nav class="app-header__nav" aria-label="Main navigation">
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" class="app-header__link"
          :class="{ 'app-header__link--active': isActive(link.to) }">
          {{ link.label }}
        </NuxtLink>
      </nav>

      <button class="app-header__hamburger" :aria-expanded="drawerOpen" aria-controls="mobile-drawer"
        aria-label="Toggle navigation menu" @click="drawerOpen = !drawerOpen">
        <Icon :name="drawerOpen ? 'mdi:close' : 'mdi:menu'" size="1.5rem" />
      </button>
    </div>

    <Teleport to="body">
      <Transition name="drawer">
        <div v-if="drawerOpen" id="mobile-drawer" class="app-header__drawer-overlay" @click.self="drawerOpen = false">
          <nav class="app-header__drawer" aria-label="Mobile navigation">
            <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" class="app-header__drawer-link"
              :class="{ 'app-header__drawer-link--active': isActive(link.to) }" @click="drawerOpen = false">
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const drawerOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

watch(() => route.path, () => {
  drawerOpen.value = false
})
</script>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: $brand-bg-mid;
  box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.06);

  &__inner {
    max-width: 72rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.5rem;
  }

  &__logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    @include tablet-down {
      display: none;
    }
  }

  &__link {
    font-family: $font-body;
    font-size: 0.9375rem;
    font-weight: 500;
    color: $text-secondary;
    text-decoration: none;
    padding: 0.5rem 0.875rem;
    border-radius: 0.5rem;
    transition: color 0.2s ease, background-color 0.2s ease;

    &:hover {
      color: $brand-red;
      background: rgba($brand-red, 0.06);
    }

    &--active {
      color: $brand-red;
      font-weight: 600;
    }
  }

  &__hamburger {
    display: none;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: none;
    border: none;
    border-radius: 0.5rem;
    color: $text-primary;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background: rgba($brand-red, 0.08);
    }

    @include tablet-down {
      display: flex;
    }
  }

  &__drawer-overlay {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(0, 0, 0, 0.4);
  }

  &__drawer {
    position: absolute;
    top: 0;
    right: 0;
    width: min(18rem, 80vw);
    height: 100%;
    background: #fff;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    box-shadow: -0.25rem 0 1rem rgba(0, 0, 0, 0.12);
  }

  &__drawer-link {
    font-family: $font-body;
    font-size: 1.0625rem;
    font-weight: 500;
    color: $text-secondary;
    text-decoration: none;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    transition: color 0.2s ease, background-color 0.2s ease;

    &:hover {
      color: $brand-red;
      background: rgba($brand-red, 0.06);
    }

    &--active {
      color: $brand-red;
      font-weight: 600;
      background: rgba($brand-red, 0.06);
    }
  }
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.25s ease;

  .app-header__drawer {
    transition: transform 0.25s ease;
  }
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;

  .app-header__drawer {
    transform: translateX(100%);
  }
}
</style>

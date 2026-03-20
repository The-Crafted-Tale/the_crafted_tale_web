<template>
  <div class="header-wrap">
    <div class="announcement-bar">
      <span class="announcement-bar__text">
        <Icon name="mdi:heart" size="0.875rem" />
        Handcrafted with love, delivered with care — Your tale, to your loved ones
        <Icon name="mdi:heart" size="0.875rem" />
      </span>
    </div>

    <header class="app-header">
      <div class="app-header__inner">
        <NuxtLink to="/" class="app-header__logo-link">
          <Icon name="mdi:heart-multiple" size="1.5rem" class="app-header__logo-icon" />
          <span class="app-header__logo-text">The Crafted Tale</span>
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
    </header>

    <Teleport to="body">
      <Transition name="drawer">
        <div v-if="drawerOpen" id="mobile-drawer" class="app-header__drawer-overlay" @click.self="drawerOpen = false">
          <nav class="app-header__drawer" aria-label="Mobile navigation">
            <div class="app-header__drawer-brand">
              <Icon name="mdi:heart-multiple" size="1.25rem" class="app-header__drawer-icon" />
              <span class="app-header__drawer-logo">The Crafted Tale</span>
            </div>
            <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" class="app-header__drawer-link"
              :class="{ 'app-header__drawer-link--active': isActive(link.to) }" @click="drawerOpen = false">
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </div>
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
.announcement-bar {
  background: $brand-maroon;
  padding: 0.5rem 1rem;
  text-align: center;

  &__text {
    font-family: $font-body;
    font-size: 0.8125rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 0.02em;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    .iconify {
      color: $brand-gold;
    }
  }
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: $brand-crimson;
  box-shadow: 0 0.125rem 0.75rem rgba(0, 0, 0, 0.2);

  &__inner {
    max-width: 72rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1.5rem;
  }

  &__logo-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }

  &__logo-icon {
    color: $brand-gold;
  }

  &__logo-text {
    font-family: $font-cursive;
    font-size: 1.5rem;
    color: $brand-gold;
    line-height: 1;
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
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    padding: 0.5rem 0.875rem;
    border-radius: 0.5rem;
    transition: color 0.2s ease, background-color 0.2s ease;
    letter-spacing: 0.01em;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }

    &--active {
      color: $brand-gold;
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
    color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    @include tablet-down {
      display: flex;
    }
  }

  &__drawer-overlay {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(0, 0, 0, 0.5);
  }

  &__drawer {
    position: absolute;
    top: 0;
    right: 0;
    width: min(18rem, 80vw);
    height: 100%;
    background: $brand-crimson;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    box-shadow: -0.25rem 0 1.5rem rgba(0, 0, 0, 0.25);
  }

  &__drawer-brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 1.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }

  &__drawer-icon {
    color: $brand-gold;
  }

  &__drawer-logo {
    font-family: $font-cursive;
    font-size: 1.25rem;
    color: $brand-gold;
  }

  &__drawer-link {
    font-family: $font-body;
    font-size: 1.0625rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    transition: color 0.2s ease, background-color 0.2s ease;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }

    &--active {
      color: $brand-gold;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.08);
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

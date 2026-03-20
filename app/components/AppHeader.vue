<template>
  <div class="header-wrap" :class="{ 'header-wrap--scrolled': scrolled }">
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
    </header>

    <Teleport to="body">
      <Transition name="drawer">
        <div v-if="drawerOpen" id="mobile-drawer" class="app-header__drawer-overlay" @click.self="drawerOpen = false"
          @keydown="handleDrawerKeydown">
          <nav ref="drawerRef" class="app-header__drawer" aria-label="Mobile navigation">
            <div class="app-header__drawer-header">
              <AppLogo size="sm" />
              <button class="app-header__drawer-close" aria-label="Close navigation menu" @click="drawerOpen = false">
                <Icon name="mdi:close" size="1.5rem" />
              </button>
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
const scrolled = ref(false)
const drawerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 40
  }

  window.addEventListener("scroll", onScroll, { passive: true })

  onUnmounted(() => window.removeEventListener("scroll", onScroll))
})

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
]

function isActive(to: string) {
  if (to === "/") return route.path === "/"
  return route.path.startsWith(to)
}

watch(
  () => route.path,
  () => {
    drawerOpen.value = false
  },
)

let savedScrollY = 0

watch(drawerOpen, (open) => {
  if (typeof document === "undefined") return

  if (open) {
    savedScrollY = window.scrollY
    document.body.style.position = "fixed"
    document.body.style.top = `-${savedScrollY}px`
    document.body.style.left = "0"
    document.body.style.right = "0"
    document.body.style.overflow = "hidden"
    nextTick(() => {
      const closeBtn = drawerRef.value?.querySelector<HTMLElement>(".app-header__drawer-close")
      closeBtn?.focus()
    })
  } else {
    document.body.style.position = ""
    document.body.style.top = ""
    document.body.style.left = ""
    document.body.style.right = ""
    document.body.style.overflow = ""
    window.scrollTo(0, savedScrollY)
  }
})

function handleDrawerKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    drawerOpen.value = false
    return
  }

  if (e.key !== "Tab") return

  const drawer = drawerRef.value
  if (!drawer) return

  const focusable = drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
  if (!focusable.length) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last?.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first?.focus()
  }
}
</script>

<style lang="scss" scoped>
.header-wrap {
  position: sticky;
  top: 0;
  z-index: 100;

  &--scrolled .announcement-bar {
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    opacity: 0;
  }
}

.announcement-bar {
  background: $brand-maroon;
  padding: 0.5rem 1rem;
  text-align: center;
  max-height: 3rem;
  overflow: hidden;
  transition:
    max-height 0.3s ease,
    padding 0.3s ease,
    opacity 0.2s ease;

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

  &__nav {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    @include tablet-down {
      display: none;
    }
  }

  &__link {
    position: relative;
    font-family: $font-body;
    font-size: 0.9375rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    padding: 0.5rem 0.875rem;
    transition: color 0.25s ease;
    letter-spacing: 0.01em;

    &::after {
      content: "";
      position: absolute;
      bottom: 0.125rem;
      left: 0.875rem;
      right: 0.875rem;
      height: 2px;
      background: $brand-gold-light;
      border-radius: 1px;
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 0.25s ease;
    }

    &:hover {
      color: $brand-gold-light;

      &::after {
        transform: scaleX(1);
      }
    }

    &--active {
      color: $brand-gold;
      font-weight: 600;

      &::after {
        transform: scaleX(1);
        background: $brand-gold;
      }
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

  &__drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding-bottom: 1.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }

  &__drawer-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    background: rgba(255, 255, 255, 0.08);
    border: none;
    border-radius: 50%;
    color: rgba(255, 255, 255, 0.85);
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
    flex-shrink: 0;

    &:hover,
    &:focus-visible {
      background: rgba(255, 255, 255, 0.18);
      color: #fff;
    }

    &:focus-visible {
      outline: 2px solid $brand-gold;
      outline-offset: 2px;
    }
  }

  &__drawer-link {
    font-family: $font-body;
    font-size: 1.0625rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    transition: color 0.25s ease;

    &:hover {
      color: $brand-gold-light;
    }

    &--active {
      color: $brand-gold;
      font-weight: 600;
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

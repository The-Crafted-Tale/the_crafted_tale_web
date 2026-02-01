<template>
  <header class="header">
    <div class="header-inner">
      <NuxtLink to="/" class="logo-link">
        <img :src="logo" alt="The Crafted Tale" class="logo" />
      </NuxtLink>
      <nav class="nav">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/products" class="nav-link">Products</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import logo from '../assets/images/logo.svg'
</script>

<style scoped>
.header {
  background-color: #ffeef1;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  padding: 0.75rem 1rem;
}

.header-inner {
  max-width: 72rem;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo {
  height: 2.25rem;
  width: auto;
  display: block;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: #4a4a4a;
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  padding: 0.375rem 0.5rem;
  border-radius: 0.25rem;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.nav-link:hover {
  color: #1f2937;
  background-color: rgba(0, 0, 0, 0.04);
}

.nav-link.router-link-active {
  color: #1f2937;
  font-weight: 600;
}

@media (max-width: 480px) {
  .header {
    padding: 0.5rem 0.75rem;
  }

  .header-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .logo {
    height: 1.875rem;
  }

  .nav {
    gap: 1rem;
  }

  .nav-link {
    font-size: 0.875rem;
  }
}
</style>

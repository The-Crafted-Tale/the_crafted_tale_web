<template>
  <div class="app-shell">
    <AppHeader />
    <main class="app-shell__main">
      <NuxtPage />
    </main>
    <AppFooter />
    <WhatsAppFloat />
  </div>
</template>

<style lang="scss" scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__main {
    flex: 1;
  }
}
</style>

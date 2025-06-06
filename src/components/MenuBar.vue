<template>
  <header>
    <nav class="content-wrapper">
      <RouterLink class="logo" to="/">Countries DB</RouterLink>
      <button>Dark mode</button>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utilities' as *;

header {
  background-color: $white;
  height: 80px;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.content-wrapper {
  width: 100%;
  max-width: $max-content-width;
  @include main-inline-padding;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  @include text-2;
  color: $grey-950;
  text-decoration: none;
}
</style>

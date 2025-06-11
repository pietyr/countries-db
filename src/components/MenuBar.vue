<template>
  <header>
    <nav class="content-wrapper">
      <RouterLink class="logo" to="/">Countries DB</RouterLink>
      <button><DarkModeIcon></DarkModeIcon><span>Dark Mode</span></button>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import DarkModeIcon from './icons/DarkModeIcon.vue';
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utilities' as *;

header {
  background-color: $white;
  height: 80px;
  display: flex;
  justify-content: center;
  @include shadow;
  color: $grey-950;
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
  text-decoration: none;
  &:visited {
    color: inherit;
  }
}

button {
  appearance: none;
  cursor: pointer;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  padding: 0;
  gap: $sp-100;

  @include text-4-bold;
}
</style>

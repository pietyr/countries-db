<script setup>
import { RouterView } from 'vue-router'
import MenuBar from './components/MenuBar.vue'
</script>

<template>
  <MenuBar />

  <RouterView />
</template>

<style scoped lang="scss">
@use '@/assets/scss/utilities' as *;
</style>

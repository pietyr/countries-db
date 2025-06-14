<template>
  <div class="filter-wrapper">
    <SearchBar />
  </div>
</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue';
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utilities' as *;

.filter-wrapper {
  max-width: $max-content-width;
  @include main-inline-padding;
  margin: 0 auto;
  padding-top: $sp-600;
}
</style>

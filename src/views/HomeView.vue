<script setup>
import FilterBar from '@/components/FilterBar.vue';
import CountriesList from '@/components/CountriesList.vue';
</script>

<template>
  <div class="content-wrapper">
    <div class="filter-wrapper">
      <FilterBar />
    </div>
    <main class="main-wrapper">
      <CountriesList />
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utilities' as *;
main {
  padding-block: $sp-600;
}
</style>

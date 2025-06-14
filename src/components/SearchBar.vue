<template>
  <div class="search-input-wrapper">
    <SearchIcon />
    <input
      type="text"
      placeholder="Search for a country..."
      @input="filterCountries"
      v-model="searchQuery"
    />
  </div>
</template>

<script setup>
import SearchIcon from '@/components/icons/SearchIcon.vue';
import { ref } from 'vue';
import { useCountryStore } from '@/stores/contryStore';

const countryStore = useCountryStore();
const searchQuery = ref('');

async function filterCountries() {
  countryStore.hasFilteredCountries = searchQuery.value.length > 0;
  if (searchQuery.value.length > 0) {
    const filteredCountriesCodes = Object.keys(countryStore.countryNames)
      .filter((countryName) =>
        countryName.toLowerCase().startsWith(searchQuery.value.toLowerCase()),
      )
      .map((countryName) => countryStore.countryNames[countryName]);

    // console.log('Filtered countries codes:', filteredCountriesCodes);
    countryStore.filteredCountries = await countryStore.loadCountries(filteredCountriesCodes);
  } else {
    countryStore.filteredCountries = [];
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utilities' as *;
.search-input-wrapper {
  display: flex;
  align-items: center;
  padding: $sp-100 $sp-400;
  color: $grey-400;
  border-radius: 4px;
  gap: $sp-300;
  max-width: 480px;
  background-color: white;
  @include shadow;
}
/*
480px width
56px height

padding-inline: 32px

*/

.search-input-wrapper input {
  border: none;
  outline: none;
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
}
</style>

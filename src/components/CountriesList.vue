<template>
  <div class="countries-list-wrapper">
    <template v-if="!countryStore.hasFilteredCountries">
      <CountryCard
        v-for="country in countries"
        :key="country.cca3"
        :country="country"
        @click="
          () => {
            useCountryStore().setCountry(country);
            router.push(`/country/${country.cca3}`);
          }
        "
      />
    </template>
    <template v-else>
      <p v-if="countryStore.filteredCountries.length === 0">No countries found.</p>
      <CountryCard
        v-for="country in countryStore.filteredCountries"
        :key="country.cca3"
        :country="country"
        @click="
          () => {
            useCountryStore().setCountry(country);
            router.push(`/country/${country.cca3}`);
          }
        "
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCountryStore } from '@/stores/contryStore';
import CountryCard from '@/components/CountryCard.vue';
import router from '@/router';

const codes = ref([]);
const randomCodes = ref([]);
const countries = ref([]);
const countryStore = useCountryStore();

onMounted(async () => {
  // Fetch country codes
  const response = await fetch('https://restcountries.com/v3.1/all?fields=cca3,name');
  const json = await response.json();
  codes.value = json.map((obj) => obj.cca3);
  json.forEach((obj) => {
    countryStore.countryNames[obj.name.common.toLowerCase()] = obj.cca3;
  });

  // Get 8 random country codes
  let i = 0;
  while (i < 8) {
    const randomIndex = Math.floor(Math.random() * codes.value.length);
    if (!randomCodes.value.includes(codes.value[randomIndex])) {
      randomCodes.value.push(codes.value[randomIndex]);
      i++;
    }
  }
  countries.value = await countryStore.loadCountries(randomCodes.value);
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utilities' as *;

.countries-list-wrapper {
  max-width: $max-content-width;
  @include main-inline-padding;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $sp-900;
}

.country-card-link {
  text-decoration: none;
}
</style>

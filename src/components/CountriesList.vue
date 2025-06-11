<template>
  <div class="countries-list-wrapper">
    <CountryCard v-for="country in countries" :country="country" :key="country.cca3" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CountryCard from '@/components/CountryCard.vue';

const codes = ref([]);
const randomCodes = ref([]);
const countries = ref([]);

onMounted(async () => {
  // Fetch country codes
  const response = await fetch('https://restcountries.com/v3.1/all?fields=cca3');
  const json = await response.json();
  codes.value = json.map((obj) => obj.cca3);

  // Get 8 random country codes
  let i = 0;
  while (i < 8) {
    const randomIndex = Math.floor(Math.random() * codes.value.length);
    if (!randomCodes.value.includes(codes.value[randomIndex])) {
      randomCodes.value.push(codes.value[randomIndex]);
      i++;
    }
  }

  // Create a string of country codes for the API call
  const codesString = randomCodes.value.join(',');

  // Fetch country data for the random codes
  const countriesResponse = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${codesString}`,
  );
  countries.value = await countriesResponse.json();
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
</style>

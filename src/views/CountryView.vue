<template>
  <div>
    <BackButton />
    <h1>{{ countryStore.selectedCountry?.name.common }}</h1>
    <div>
      <img
        :src="countryStore.selectedCountry?.flags.svg"
        alt="Flag of {{ countryStore.selectedCountry?.name.common }}"
      />
    </div>
  </div>
</template>

<script setup>
import { useCountryStore } from '@/stores/contryStore';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import BackButton from '@/components/BackButton.vue';

const route = useRoute();
const countryStore = useCountryStore();

onMounted(() => {
  if (!countryStore.selectedCountry) {
    const countryCode = route.params.country_code;
    fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      .then((response) => response.json())
      .then((data) => {
        countryStore.setCountry(data[0]);
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
      });
  }
});
</script>

<style lang="scss" scoped></style>

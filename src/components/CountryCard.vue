<template>
  <section class="container">
    <div class="img-wrapper">
      <img :src="countryFlagURL" alt="" />
    </div>
    <div class="text-wrapper">
      <h4>{{ countryName }}</h4>
      <div class="details">
        <p><b>Population: </b>{{ countryPopulation }}</p>
        <p><b>Region: </b>{{ countryRegion }}</p>
        <p><b>Capital: </b>{{ countryCapital }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, defineProps } from 'vue';

// Define the props for the component
const props = defineProps({
  country: {
    type: Object,
    required: true,
  },
});

const countryFlagURL = ref(props.country.flags.svg);
const countryName = ref(props.country.name.common);
const countryCapital = ref(props.country.capital ? props.country.capital[0] : 'No capital');
const countryPopulation = ref(props.country.population.toLocaleString());
const countryRegion = ref(props.country.region);
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utilities' as *;
.container {
  max-width: 264px;
  border-radius: $sp-100;
  background-color: $white;
  overflow: hidden;
  @include shadow;
}

.img-wrapper {
  width: 100%;
  aspect-ratio: 3 / 2;

  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.text-wrapper {
  padding: $sp-300 $sp-300 $sp-600;
  color: $grey-950;
  border-radius: 0 0 4px 4px;
  display: flex;
  flex-direction: column;
  gap: $sp-200;
  h4 {
    @include text-3;
    margin: 0;
  }
  .details {
    display: flex;
    flex-direction: column;
    gap: $sp-100;

    p {
      @include text-4-light;
      margin: 0;
      b {
        @include text-4-bold;
      }
    }
  }
}
</style>

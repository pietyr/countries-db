<template>
  <div class="content-wrapper">
    <div class="button-wrapper">
      <BackButton />
    </div>
    <div class="country-details">
      <div class="flag-wrapper">
        <img
          :src="countryStore.selectedCountry?.flags.svg"
          alt="Flag of {{ countryStore.selectedCountry?.name.common }}"
        />
      </div>
      <div class="text-wrapper">
        <div>
          <h2>{{ countryStore.selectedCountry?.name.common }}</h2>
        </div>
        <div class="text-split">
          <div>
            <p>
              <b>Native Name: </b>
              {{
                countryStore.selectedCountry?.name.nativeName[
                  Object.keys(countryStore.selectedCountry.name.nativeName)[0]
                ].common
              }}
            </p>
            <p>
              <b>Population: </b>
              {{ countryStore.selectedCountry?.population }}
            </p>
            <p>
              <b>Region: </b>
              {{ countryStore.selectedCountry?.region }}
            </p>
            <p>
              <b>Subregion: </b>
              {{ countryStore.selectedCountry?.subregion }}
            </p>
            <p>
              <b>Capital: </b>
              {{
                countryStore.selectedCountry?.capital
                  ? countryStore.selectedCountry.capital[0]
                  : 'No capital'
              }}
            </p>
          </div>
          <div>
            <p>
              <b>Top Level Domain: </b>
              {{
                countryStore.selectedCountry?.tld ? countryStore.selectedCountry.tld[0] : 'No TLD'
              }}
            </p>
            <p>
              <b>Currencies: </b>
              {{
                countryStore.selectedCountry?.currencies
                  ? Object.values(countryStore.selectedCountry.currencies)
                      .map((currency) => currency.name)
                      .join(', ')
                  : 'No currencies'
              }}
            </p>
            <p>
              <b>Languages: </b>
              {{
                countryStore.selectedCountry?.languages
                  ? Object.values(countryStore.selectedCountry.languages).join(', ')
                  : 'No languages'
              }}
            </p>
          </div>
        </div>
      </div>
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
    const country = countryStore.loadCountry(countryCode);
    if (country) {
      countryStore.setCountry(country);
    }
  }
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utilities' as *;

.content-wrapper {
  padding: $sp-1000;
  display: flex;
  flex-direction: column;
  gap: $sp-1000;
  @include main-inline-padding;
  max-width: $max-content-width;
  margin: 0 auto;

  .country-details {
    display: flex;
    justify-content: space-between;

    @media (max-width: 1250px) {
      flex-direction: column;
      align-items: flex-start;
      gap: $sp-600;
    }

    > div {
      flex: 0 1 45%;
    }

    img {
      display: block;
      width: 100%;
      @media (max-width: 1250px) {
        max-width: 480px;
      }

      border-radius: 4px;
      @include shadow;
    }

    .text-wrapper {
      display: flex;
      flex-direction: column;
      gap: $sp-300;
      justify-content: center;
    }
    .text-split {
      display: flex;
      justify-content: space-between;
      @media (max-width: 1250px) {
        // flex-direction: column;
        gap: $sp-600;
      }
      @media (max-width: 650px) {
        flex-direction: column;
        gap: unset;
      }
      p {
        color: $grey-950;
        @include text-4-light;
        b {
          @include text-4-bold;
        }
      }
    }

    h2 {
      @include text-1;
      margin: 0;
      color: $grey-950;
    }
  }
}
</style>

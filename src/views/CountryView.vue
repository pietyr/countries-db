<template>
  <div>
    <div>
      <BackButton />
    </div>
    <div>
      <div>
        <img
          :src="countryStore.selectedCountry?.flags.svg"
          alt="Flag of {{ countryStore.selectedCountry?.name.common }}"
        />
      </div>
      <div>
        <div>
          <h2>{{ countryStore.selectedCountry?.name.common }}</h2>
        </div>
        <div>
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
        <div>
          <b>Border Countries: </b>
          <div>
            <span
              v-for="border in countryStore.selectedCountry?.borders || []"
              :key="border"
              class="border-country"
            >
              {{ border }}
            </span>
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

<style lang="scss" scoped></style>

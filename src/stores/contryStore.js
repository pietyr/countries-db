import { defineStore } from 'pinia';

export const useCountryStore = defineStore('country', {
  state: () => ({
    selectedCountry: null,
  }),
  actions: {
    setCountry(country) {
      this.selectedCountry = country;
    },
  },
});

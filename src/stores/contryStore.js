import { defineStore } from 'pinia';

export const useCountryStore = defineStore('country', {
  state: () => ({
    selectedCountry: null,
    countries: {},
    loadedCountries: [],
    filteredCountries: [],
    hasFilteredCountries: false,
    countryNames: {},
  }),
  actions: {
    // Select a country for routing
    setCountry(country) {
      this.selectedCountry = country;
    },

    // Save new country to localStorage
    saveToLocalStorage(countryCode, countryData) {
      let cache = {};
      const raw = localStorage.getItem('countryCache');
      if (raw) {
        // Attempt to parse existing cache
        try {
          cache = JSON.parse(raw);
        } catch (e) {
          cache = {};
          console.error('Error parsing country cache from localStorage:', e);
        }
      }
      // Update the cache with the new country data
      cache[countryCode] = countryData;
      localStorage.setItem('countryCache', JSON.stringify(cache));
    },

    // Load country data from localStorage
    loadFromLocalStorage(countryCode) {
      const raw = localStorage.getItem('countryCache');
      if (raw) {
        try {
          const cache = JSON.parse(raw);
          return cache[countryCode] || null;
        } catch (e) {
          console.error('Error parsing country cache from localStorage:', e);
          return null;
        }
      }
      return null;
    },

    // Get country object by countryCode from store, localStorage, or API
    async loadCountry(countryCode) {
      // Check if the country is already in the store
      if (this.countries[countryCode]) {
        return this.countries[countryCode];
      }

      // Check localStorage for cached country data
      const cachedCountry = this.loadFromLocalStorage(countryCode);
      if (cachedCountry) {
        this.countries[countryCode] = cachedCountry;
        return cachedCountry;
      }

      // If not found in store or localStorage, fetch from API
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        if (!response.ok) {
          throw new Error(`Error fetching country data: ${response.statusText}`);
        }
        const countryData = await response.json();
        this.countries[countryCode] = countryData[0];
        this.saveToLocalStorage(countryCode, countryData[0]);
        return countryData[0];
      } catch (error) {
        console.error('Failed to load country:', error);
        return null;
      }
    },

    // Get array of countries from array of country codes
    async loadCountries(countryCodes) {
      const outputCountries = [];
      const fetchArray = [];
      countryCodes.forEach((code) => {
        // Check if the country is already in the store

        if (this.countries[code]) {
          console.log(`Country ${code} found in store.`, this.countries[code]);
          outputCountries.push(this.countries[code]);
        } else {
          // Check localStorage for cached country data
          const cachedCountry = this.loadFromLocalStorage(code);
          if (cachedCountry) {
            console.log(`Country ${code} found in localStorage.`, cachedCountry);
            this.countries[code] = cachedCountry;
            outputCountries.push(cachedCountry);
          } else {
            fetchArray.push(code);
          }
        }
      });

      // Fetch countries that are not in the store or localStorage
      if (fetchArray.length > 0) {
        const fetchString = fetchArray.join(',');
        try {
          const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${fetchString}`);
          if (!response.ok) {
            throw new Error(`Error fetching countries data: ${response.statusText}`);
          }
          const countriesData = await response.json();
          countriesData.forEach((countryData) => {
            this.countries[countryData.cca2] = countryData;
            this.saveToLocalStorage(countryData.cca2, countryData);
            outputCountries.push(countryData);
          });
        } catch (error) {
          console.error('Failed to load countries:', error);
        }
      }
      return outputCountries.flat();
    },
  },
});

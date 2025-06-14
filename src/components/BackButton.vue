<template>
  <button @click="$router.go(-1)"><BackArrowIcon /><span>Back</span></button>
</template>

<script setup>
import BackArrowIcon from '@/components/icons/BackArrowIcon.vue';
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utilities' as *;
button {
  background-color: $white;
  border: none;
  border-radius: 4px;
  color: $grey-950;
  cursor: pointer;
  @include text-4-light;
  @include shadow;
  display: flex;
  align-items: center;
  gap: $sp-200;
  padding: 4px $sp-400;
}
</style>

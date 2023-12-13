<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
</script>

<template>
<!-- navbar -->
  <header>
      <NavBar />   
  </header>

<!-- pages -->
  <RouterView />

<!-- footer -->

</template>

<style scoped>

</style>

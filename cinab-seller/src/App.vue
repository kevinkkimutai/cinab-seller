<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';

</script>

<template>

<div>
   <NavBar />
   <RouterView  class="text-black w-auto sm:ml-52 p-2 mt-16 bg-white dark:bg-gray-900"/>
</div>
 


</template>

<style scoped>

</style>

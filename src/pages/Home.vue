<script setup lang="ts">
import AboutCard from '../components/AboutCard.vue';

</script>

<template>
  <div class="">
    <h1 class="text-3xl font-bold text-blue-500">Home Page</h1>
    <router-link to="/about" class="text-blue-700 underline">Go to About</router-link>
    <AboutCard />
  </div>
</template>

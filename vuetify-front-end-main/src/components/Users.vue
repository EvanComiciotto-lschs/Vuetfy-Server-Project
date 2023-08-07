<script setup>
 import notification from './notification.vue';
import doughnut from './doughnut.vue';
import bar from './bargraph.vue';
</script>

<template>
   <notification />
   <b class=heading>Users</b>
  <doughnut />
  <bar />
</template>

<style scoped>
 .heading {
    font-size: xx-large;
 }
 </style>
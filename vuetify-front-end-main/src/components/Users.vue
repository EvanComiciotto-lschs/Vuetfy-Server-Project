<template>
  <notification />
  <b class=heading>Users</b>
  <doughnut />
  <bar />
</template>

<script setup>
import notification from './notification.vue';
import doughnut from './doughnut.vue';
import bar from './bargraph.vue';
</script>

<style scoped>
.heading {
  font-size: xx-large;
}
</style>

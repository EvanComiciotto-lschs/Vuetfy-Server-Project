<template>
  <notification />
  <b class=heading>Users by Department</b>
  <div class="chart-container">
    <doughnut />
    <bar />
  </div>
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

.chart-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
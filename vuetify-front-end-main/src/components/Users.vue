<template>
  <notification />
  <h2 class=heading>Total Accounts</h2>
  <userNumbers/>
  <div class="divider2"></div>
  <h2 class=heading>Users by Department</h2>
  <div class="chart-container">
    <div class="doughnut-container">
      <div class="doughnut"><doughnut /></div>
    </div>
    <div class="divider"></div>
    <div class="bargraphs">
      <div class="bg upm">
        <b class=heading>Users per Manager</b>
        <perManager />
      </div>
      <div class="bg upjt">
        <b class=heading>Users per Job Title</b>
        <jobTitles />
      </div>
    </div>
  </div>
</template>

<script setup>
import notification from './notification.vue';
import doughnut from './doughnut.vue';
import perManager from './perManager.vue';
import jobTitles from './jobTitles.vue';
import userNumbers from './userNumbers.vue'
</script>
<style scoped>
.heading {
  font-size: xx-large;
}

.chart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  max-width: 80%;
  margin: 0 auto;
  padding: 20px;
}

.bg {
  width: 45%;
}

.divider {
  height: 5rem;
  width: 100%;
}
.divider2 {
  height: 2.5rem;
  width: 100%;
}

.doughnut-container {
  width: 100%;
}

.doughnut {
  max-width: 525px;
  display: flex;
  margin: auto;
}

.bargraphs {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
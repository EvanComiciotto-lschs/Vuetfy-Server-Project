<template>
   <notification />
   <b class = heading>Users</b>
  <div class="chart-container">
    {{ chartData }}
    <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script lang="ts" setup>
import notification from './notification.vue';
import { ref, onMounted } from 'vue'
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend);

const chartOptions = {
  responsive: true
}
const chartData = ref<ChartData<'doughnut'>>({
  labels: ["hooray", "yipee"],
  datasets: [{ data: [15,20], backgroundColor: ["#00ffff", "#ff0000",] }]
})

onMounted(async () => {
  // let resp = await fetch('https://itassets.aiscorp.com:3000/users', {
  //   headers: {
  //     auth: '6rqfduihfwsesuhgfweiouyw3rtfs897byw4tgoiuwy4sro9uw34t0u94t'
  //   },
  // });
  let resp = await fetch('http://fkhan.aiscorp.local:3000/users', {
    headers: {
      auth: '6rqfduihfwsesuhgfweiouyw3rtfs897byw4tgoiuwy4sro9uw34t0u94t'
    },
  });

  if (resp.ok) {
    let newData: ChartData<'doughnut'> = {
      labels: [],
      datasets: [{ data: [], backgroundColor: ["#15779F", "#EF3b32","#F26522", "#27272D", "#708490"] }]
    }

    const data = await resp.json();
    console.log(chartData.value)
    newData.labels = Object.keys(data.departments);
    newData.datasets[0].data = Object.values(data.departments);
    chartData.value = newData;
  } else {
    console.error('Error fetching data:');
  }
});
</script>


<style scoped>
.heading{
    font-size: xx-large;
 }
.chart-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
</style>
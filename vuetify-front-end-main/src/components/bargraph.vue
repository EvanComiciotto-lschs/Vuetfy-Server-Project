<template>
    <div class="chart-container">
       {{ chartData }}
       <Bar id="reportingTo" :options="chartOptions" :data="chartData" />
    </div>
 
 </template>
 
 <script lang="ts" setup>
 import { ref, onMounted } from 'vue'
 import {
    Chart as ChartJS, Tooltip, Legend, ChartData, Title, BarElement, CategoryScale, LinearScale
 } from 'chart.js'
 import { Bar } from 'vue-chartjs'
 
 ChartJS.register(Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale);
 
 const chartOptions = {
    responsive: true
 }
 const chartData = ref<ChartData<'bar'>>({
    labels: [],
    datasets: [{ data: [15, 20], backgroundColor: ["#00ffff", "#ff0000",] }]
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
       let newData: ChartData<'bar'> = {
          labels: [],
          datasets: [{ data: [], backgroundColor: ["#15779F", "#EF3b32", "#F26522", "#27272D", "#708490"] }]
       }
 
       const data = await resp.json();
       //console.log(chartData.value)
       newData.labels = Object.keys(data.manager);
       newData.datasets[0].data = Object.values(data.manager);
       chartData.value = newData;
    } else {
       console.error('Error fetching data:');
    }
 });
 </script>
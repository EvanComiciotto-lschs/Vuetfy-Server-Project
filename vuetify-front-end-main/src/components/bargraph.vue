<template>
   <Bar id="reportingTo" :options="chartOptions" :data="chartData" />
</template>
 
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
   Chart as ChartJS, Tooltip, Legend, ChartData, Title, BarElement, CategoryScale, LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale);

type Manager = {
   name: string;
   size: number;
};

const chartOptions = {
   responsive: true,
   plugins: {
      legend: {
         display: false
      }
   }
}
const chartData = ref<ChartData<'bar'>>({
   labels: [],
   datasets: [{ data: [], backgroundColor: ["#00ffff", "#ff0000",] }]
})

onMounted(async () => {
   let resp = await fetch('https://itassets.aiscorp.com:3000/users', {
      headers: {
         auth: '6rqfduihfwsesuhgfweiouyw3rtfs897byw4tgoiuwy4sro9uw34t0u94t'
      },
   });
   //  let resp = await fetch('http://fkhan.aiscorp.local:3000/users', {
   //     headers: {
   //        auth: '6rqfduihfwsesuhgfweiouyw3rtfs897byw4tgoiuwy4sro9uw34t0u94t'
   //     },
   //  });

   if (resp.ok) {
      let newData: ChartData<'bar'> = {
         labels: [],
            datasets: [{
                data: [], backgroundColor: [
                    "#a70000",
                    "#ca0000",
                    "#ff0000",
                    "#fa2b2b",
                    "#ff5252",
                    "#ff6969",
                    "#ff7b7b",
                    "#ff9494",
                    "#ffbaba",
                    "#ffd6d6",
                    "lime"
                ]
            }]
      }

      const data = await resp.json();

      const managersWithSize: Manager[] = Object.entries(data.manager).filter(d => d[0] != "null" && data[1] != 0).map(([name, size]) => ({
         name,
         size: size as number, // Cast size to number to satisfy TypeScript
      }));
      managersWithSize.sort((a: Manager, b: Manager) => b.size - a.size);

      //console.log(chartData.value)
      newData.labels = managersWithSize.map((manager) => manager.name); //Object.keys(data.manager).filter(label => label != "null");
      newData.datasets[0].data = managersWithSize.map((manager) => manager.size); //Object.values(data.manager).filter(data => data != 0) as [];
      chartData.value = newData;
   } else {
      console.error('Error fetching data:');
   }
});
</script>
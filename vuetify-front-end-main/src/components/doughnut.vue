<template>
    <notification />
    <b class=heading>Users by Department</b>
    <div class="chart-container">
        <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>

    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
 
<script lang="ts" setup>
import notification from './notification.vue';
import { ref, onMounted } from 'vue'
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, Title, BarElement, CategoryScale, LinearScale
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend);
type Department = {
    name: string;
    size: number;
};
const chartOptions = {
    responsive: true
}
const chartData = ref<ChartData<'doughnut'>>({
    labels: ["hooray", "yipee"],
    datasets: [{ data: [15, 20], backgroundColor: ["#00ffff", "#ff0000"] }]
});

onMounted(async () => {
    // Fetch data from the server
    let resp = await fetch('https://itassets.aiscorp.com:3000/users', {
        headers: {
            auth: '6rqfduihfwsesuhgfweiouyw3rtfs897byw4tgoiuwy4sro9uw34t0u94t'
        },
    });

    if (resp.ok) {
        const data = await resp.json();

        // Create a new array with objects containing department name and size
        const departmentsWithSize: Department[] = Object.entries(data.departments).map(([name, size]) => ({
            name,
            size: size as number, // Cast size to number to satisfy TypeScript
        }));

        // Sort the array in descending order based on size (largest to smallest)
        departmentsWithSize.sort((a: Department, b: Department) => b.size - a.size);
        let newData: ChartData<'doughnut'> = {
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

        // Set the chart data
        newData.labels = departmentsWithSize.map((dept) => dept.name); //Object.keys(data.departments);
        newData.datasets[0].data = departmentsWithSize.map((dept) => dept.size); //Object.values(data.departments);
        chartData.value = newData;
    } else {
        console.error('Error fetching data:');
    }
});
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
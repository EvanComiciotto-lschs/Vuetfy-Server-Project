<template>
  <div class="chart-container">
    <canvas ref="doughnutChartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Doughnut } from 'chart.js';

export default {
  name: 'MyDoughnutChart',
  setup() {
    const doughnutChartCanvas = ref(null);

    onMounted(() => {
      const ctx = doughnutChartCanvas.value.getContext('2d');
      const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'My Dataset',
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
      };

      new Doughnut(ctx, {
        data: data,
        options: options,
      });
    });

    return {
      doughnutChartCanvas,
    };
  },
};
</script>

<style scoped>
.chart-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
</style>
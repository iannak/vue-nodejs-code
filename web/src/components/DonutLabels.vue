<template>
  <div>
    <apexchart type="donut" :options="chartOptions" :series="chartSeries" height="400" />
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';
import apiClient from '@/services/api';

export default {
  name: 'DonutLabels',
  components: {
    Apexchart: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'donut-chart',
        },
        labels: [],
        colors: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        }],
      },
      chartSeries: [],
    };
  },
  mounted() {
    this.fetchChartData();
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await apiClient.get('/participants');
        const participants = response.data;

        this.chartOptions.labels = participants.slice(0, 5).map((participant) => participant.lastName);
        this.chartSeries = participants.slice(0, 5).map((participant) => participant.percentage);
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
};
</script>

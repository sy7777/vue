<template lang="html">
  <Bar
    v-if="chartData && chartOptions"
    :chart-data="chartData"
    :chart-options="chartOptions"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Bar } from "vue-chartjs";

interface IData {
  chartData: any;
  chartOptions: any;
}

export default defineComponent({
  props: ["chart"],
  components: {
    Bar,
  },
  data: function (): IData {
    return {
      chartData: undefined,
      chartOptions: undefined,
    };
  },
  watch: {
    chart: {
      handler: function () {
        this.updateChart();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    updateChart: function () {
      setTimeout(() => {
        const options = {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
          },
          title: {
            display: true,
          },
        };

        this.chartData = this.chart;
        this.chartOptions = options;
      });
    },
  },
});
</script>

<style scoped></style>

<script lang="ts">
import { defineComponent } from "vue";
import { Bar } from "vue-chartjs";
import { mapState } from "vuex";

export default defineComponent({
  props: ["chart"],
  mixins: [Bar],
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
          scales: {
            xAxes: [
              {
                display: false,
                barPercentage: 1.3,
                ticks: {
                  max: 3,
                },
              },
              {
                display: true,
                ticks: {
                  autoSkip: false,
                  max: 4,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        };

        if (this.chart.datasets.length) {
          // @ts-ignore
          this.renderChart(this.chart, options);
          // @ts-ignore
        } else if (this.$data._chart) {
          // @ts-ignore
          this.$data._chart.destroy();
        }
      });
    },
  },
});
</script>

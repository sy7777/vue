<template lang="html">
  <canvas :id="canvasId"></canvas>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import _ from "lodash";
import { mapState } from "vuex";
import Chart from "chartjs-gauge";

import {
  IVisualisationGaugeSettings,
  IVisualisationGaugeSettingsRange,
} from "@/shared/models";

interface IData {
  canvasId: string;
}

export default defineComponent({
  data: function (): IData {
    return {
      canvasId: _.uniqueId("canvasId-"),
    };
  },
  props: ["chart"],
  watch: {
    chart: {
      handler: function () {
        if (this.chart) {
          this.updateChart();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    updateChart: function () {
      setTimeout(() => {
        const { lastValue, gaugeSettings } = this.chart;
        const { minimum, ranges } = gaugeSettings;

        const data: number[] = ranges.map(
          (range: IVisualisationGaugeSettingsRange) => range.value
        );
        const backgroundColor: string[] = ranges.map(
          (range: IVisualisationGaugeSettingsRange) => range.colourHex
        );

        // @ts-ignore
        const ctx = document.getElementById(this.canvasId).getContext("2d");

        const chart = new Chart(ctx, {
          type: "gauge",
          data: {
            datasets: [
              {
                value: lastValue || 0,
                minValue: minimum,
                data,
                backgroundColor,
              },
            ],
          },
          options: {
            // @ts-ignore
            needle: {
              radiusPercentage: 2,
              widthPercentage: 3.2,
              lengthPercentage: 80,
              color: "rgba(0, 0, 0, 1)",
            },
            valueLabel: {
              display: true,
              formatter: (value) => value,
              color: "rgba(255, 255, 255, 1)",
              backgroundColor: "rgba(0, 0, 0, 1)",
              borderRadius: 5,
              padding: {
                top: 10,
                bottom: 10,
              },
              fontSize: 18,
            },
          },
        });
      });
    },
  },
});
</script>

<template lang="html">
  <div
    :class="{
      'maximised-visualisation': maximised,
    }"
  >
    <template v-if="map">
      <VisualisationMapTwoDimensional
        v-if="visualisationType === MAP_TWO_DIMENSIONAL"
        :markers="map"
      />
      <VisualisationMapThreeDimensional
        v-if="visualisationType === MAP_THREE_DIMENSIONAL"
        :markers="map"
      />
      <VisualisationMapVectorContour
        v-if="visualisationType === MAP_VECTOR_CONTOUR"
        :markers="map"
        :colour="mixedColour"
      />
      <VisualisationMapHeat
        v-if="visualisationType === MAP_HEAT"
        :markers="map"
        :colour="mixedColour"
      />
      <VisualisationMapAnimatedLine
        v-if="visualisationType === MAP_ANIMATED_LINE"
        :markers="map"
      />
      <VisualisationMapCameraPath
        v-if="visualisationType === MAP_CAMERA_PATH"
        :markers="map"
      />
    </template>
    <template v-if="plot">
      <VisualisationBarChart
        v-if="visualisationType === BAR_CHART"
        :chart="plot"
      />
      <VisualisationPieChart
        v-if="visualisationType === PIE_CHART"
        :chart="plot"
      />
      <VisualisationHistogram
        v-if="visualisationType === HISTOGRAM"
        :chart="plot"
      />
      <VisualisationScatterPlot
        v-if="visualisationType === SCATTER_PLOT"
        :chart="plot"
      />
      <VisualisationLinePlot
        v-if="visualisationType === LINE_PLOT"
        :chart="plot"
      />
      <VisualisationTimeSeries
        v-if="visualisationType === TIME_SERIES"
        :chart="plot"
      />
      <VisualisationGauge
        v-if="visualisationType === GAUGE_CHART"
        :chart="plot"
      />
    </template>
    <VisualisationLastValue
      v-if="visualisationLastValue && visualisationType === LAST_VALUE"
      :visualisationLastValue="visualisationLastValue"
    />
    <button
      v-if="maximised"
      type="button"
      class="btn btn-sm btn-icon btn-danger maximised-visualisation-close-button"
      v-on:click="onToggleMaximise"
    >
      <i class="flaticon2-delete"></i>
    </button>
  </div>
</template>

<style scoped lang="scss">
.maximised-visualisation {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10000;
  background: white;

  .maximised-visualisation-close-button {
    position: absolute;
    top: 10px;
    left: 10px;
  }
}
</style>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import dayjs from "dayjs";
// @ts-ignore
import mix from "mix-color";

import {
  GROUPED_BAR_CHART,
  BAR_CHART,
  GROUPED_KERNEL_DENSITY_PLOT,
  BOX_PLOT,
  VIOLIN_PLOT,
  RIDGELINE_PLOT,
  MEAN_SEM_PLOT,
  STRIP_PLOT,
  BEESWARM_PLOT,
  CLEVELAND_DOT_CHART,
  PIE_CHART,
  TREE_MAP,
  HISTOGRAM,
  KERNEL_DENSITY_PLOT,
  DOT_CHART,
  STACKED_BAR_CHART,
  SEGMENTED_BAR_CHART,
  SCATTER_PLOT,
  LINE_PLOT,
  MAP_THREE_DIMENSIONAL,
  MAP_TWO_DIMENSIONAL,
  MAP_ANIMATED_LINE,
  MAP_ANIMATED_PATH,
  MAP_CAMERA_PATH,
  MAP_VECTOR_CONTOUR,
  MAP_HEAT,
  GAUGE_CHART,
  TIME_SERIES,
  LAST_VALUE,
} from "@/shared/constants";
import { MapMarker } from "@/models";
import { VisualisationScatterPlot } from "../visualisation-scatter-plot";
import { VisualisationLinePlot } from "../visualisation-line-plot";
import { VisualisationBarChart } from "../visualisation-bar-chart";
import { VisualisationPieChart } from "../visualisation-pie-chart";
import { VisualisationHistogram } from "../visualisation-histogram";
import { VisualisationTimeSeries } from "../visualisation-time-series";
import { VisualisationMapTwoDimensional } from "../visualisation-map-two-dimensional";
import { VisualisationMapThreeDimensional } from "../visualisation-map-three-dimensional";
import { VisualisationMapVectorContour } from "../visualisation-map-vector-contour";
import { VisualisationMapHeat } from "../visualisation-map-heat";
import { VisualisationMapAnimatedLine } from "../visualisation-map-animated-line";
import { VisualisationMapCameraPath } from "../visualisation-map-camera-path";
import { VisualisationGauge } from "../visualisation-gauge";
import { VisualisationLastValue } from "../visualisation-last-value";
import {
  canSupportBivariateVisualisations,
  randomStreamColour,
  randomChartColour,
} from "@/shared/services";
import {
  IVisualisationGaugeSettings,
  IVisualisationGaugeSettingsRange,
  IVisualisationLastValue,
} from "@/shared/models";
import { VisualisationAttributeInterpretation } from "@/shared/constants";

interface IData {
  GROUPED_BAR_CHART: string;
  BAR_CHART: string;
  GROUPED_KERNEL_DENSITY_PLOT: string;
  BOX_PLOT: string;
  VIOLIN_PLOT: string;
  RIDGELINE_PLOT: string;
  MEAN_SEM_PLOT: string;
  STRIP_PLOT: string;
  BEESWARM_PLOT: string;
  CLEVELAND_DOT_CHART: string;
  PIE_CHART: string;
  TREE_MAP: string;
  HISTOGRAM: string;
  KERNEL_DENSITY_PLOT: string;
  DOT_CHART: string;
  STACKED_BAR_CHART: string;
  SEGMENTED_BAR_CHART: string;
  SCATTER_PLOT: string;
  LINE_PLOT: string;
  TIME_SERIES: string;
  MAP_THREE_DIMENSIONAL: string;
  MAP_TWO_DIMENSIONAL: string;
  MAP_ANIMATED_LINE: string;
  MAP_ANIMATED_PATH: string;
  MAP_CAMERA_PATH: string;
  MAP_VECTOR_CONTOUR: string;
  MAP_HEAT: string;
  GAUGE_CHART: string;
  LAST_VALUE: string;
  plot: any;
  map: any;
  visualisationLastValue: IVisualisationLastValue | undefined;
  mixedColour: any;
  processedData: any[];
}

export default defineComponent({
  components: {
    VisualisationScatterPlot,
    VisualisationLinePlot,
    VisualisationBarChart,
    VisualisationPieChart,
    VisualisationHistogram,
    VisualisationTimeSeries,
    VisualisationMapTwoDimensional,
    VisualisationMapThreeDimensional,
    VisualisationMapVectorContour,
    VisualisationMapHeat,
    VisualisationMapAnimatedLine,
    VisualisationMapCameraPath,
    VisualisationGauge,
    VisualisationLastValue,
  },
  computed: {
    isUnivariate: function () {
      return this.propertySettings.length === 1;
    },
    isBivariate: function () {
      return canSupportBivariateVisualisations(this.propertySettings);
    },
    isTimeDependent: function () {
      return (
        this.propertySettings.length === 2 &&
        this.propertySettings.some(
          (propertySetting: any) =>
            propertySetting.property.Id.toLowerCase() === "timestamp" ||
            propertySetting.property.Id.toLowerCase().includes("date")
        )
      );
    },
    isMappable: function () {
      const latitude: boolean = this.propertySettings.some(
        (item: any) => item.property.Id.toLowerCase() === "latitude"
      );
      const longitude: boolean = this.propertySettings.some(
        (item: any) => item.property.Id.toLowerCase() === "longitude"
      );
      return latitude && longitude;
    },
  },
  data: function (): IData {
    return {
      GROUPED_BAR_CHART,
      BAR_CHART,
      GROUPED_KERNEL_DENSITY_PLOT,
      BOX_PLOT,
      VIOLIN_PLOT,
      RIDGELINE_PLOT,
      MEAN_SEM_PLOT,
      STRIP_PLOT,
      BEESWARM_PLOT,
      CLEVELAND_DOT_CHART,
      PIE_CHART,
      TREE_MAP,
      HISTOGRAM,
      KERNEL_DENSITY_PLOT,
      DOT_CHART,
      STACKED_BAR_CHART,
      SEGMENTED_BAR_CHART,
      SCATTER_PLOT,
      LINE_PLOT,
      TIME_SERIES,
      MAP_THREE_DIMENSIONAL,
      MAP_TWO_DIMENSIONAL,
      MAP_ANIMATED_LINE,
      MAP_ANIMATED_PATH,
      MAP_CAMERA_PATH,
      MAP_VECTOR_CONTOUR,
      MAP_HEAT,
      GAUGE_CHART,
      LAST_VALUE,
      plot: undefined,
      map: undefined,
      visualisationLastValue: undefined,
      mixedColour: undefined,
      processedData: [],
    };
  },
  methods: {
    convertToNumber: function (value: any) {
      if (!isNaN(value)) {
        return Number(value);
      } else if (!value) {
        return 0;
      } else if (dayjs(value).isValid()) {
        return dayjs(value).unix();
      } else {
        return (value || "")
          .toString()
          .split("")
          .reduce(
            (total: number, letter: string) => total + letter.charCodeAt(0),
            0
          );
      }
    },
    generateColour: function (properties: any[]) {
      // TODO: add real colour mixing utility
      try {
        const sdsStreamColourCodes: string[] = properties.map(
          (property: any) => randomStreamColour(property.sdsStreamId).hex
        );

        const mixed = mix(sdsStreamColourCodes[0], sdsStreamColourCodes[1]);

        return mixed;
      } catch (error) {
        return "red";
      }
    },
    generateBivariateQuantitativeQuantitativePlot: function (
      properties: any[],
      data: any,
      colour: string
    ) {
      const independentProperty: any = properties.find(
        (item: any) =>
          item.property.Id === this.bivariateSettings.independentPropertyId
      );
      const independentPropertyData: any = data.find(
        (item: any) => item.sdsStreamId === independentProperty.sdsStreamId
      ).data;
      const dependentProperties: any[] = properties.filter(
        (item: any) => item.property.Id !== independentProperty.property.Id
      );

      return {
        datasets: dependentProperties.map((dependentProperty: any) => {
          const dependentPropertyData: any = data.find(
            (item: any) => item.sdsStreamId === dependentProperty.sdsStreamId
          ).data;

          const size: number = Math.max(
            Object.values(independentPropertyData).length,
            Object.values(dependentPropertyData).length
          );

          return {
            label: `${independentProperty.property.Name} vs ${dependentProperty.property.Name}`,
            data: new Array(size).fill(0).map((_, index: number) => {
              return {
                x: this.convertToNumber(
                  (independentPropertyData[index] || {})[
                    independentProperty.property.Id
                  ]
                ),
                y: this.convertToNumber(
                  (dependentPropertyData[index] || {})[
                    dependentProperty.property.Id
                  ]
                ),
              };
            }),
            borderColor: randomChartColour(dependentProperty.property.Name),
            backgroundColor: "transparent",
            borderWidth: 2,
            pointRadius: 2,
          };
        }),
      };
    },
    generateUnivariatePlot: function (
      properties: any[],
      data: any,
      colour: string
    ) {
      const propertySettings: any = properties[0];

      const values: any[] = data
        .find((item: any) => item.sdsStreamId === propertySettings.sdsStreamId)
        .data.map((item: any) => item[propertySettings.property.Id])
        .map((item: any) => (item ? item : 0));

      const summation: any = values.reduce(
        (acc: any, value: string) => ({
          ...acc,
          [value]: (acc[value] || 0) + 1,
        }),
        {}
      );

      const labels: string[] = Object.keys(summation).sort((a, b) => {
        const first: number = Number(a) || 0;
        const second: number = Number(b) || 0;

        return first - second;
      });
      const targetData: number[] = labels.map(
        (label: string) => summation[label]
      );
      const colours: any[] = labels.map((label: string) =>
        randomChartColour(label)
      );

      return {
        labels,
        datasets: [
          {
            data: targetData,
            backgroundColor: colours,
          },
        ],
      };
    },
    generateTimeSeriesPlot: function (propertySettings: any[], data: any[]) {
      const independentProperty: any = propertySettings.find(
        (item: any) =>
          item.property.Id.toLowerCase() === "timestamp" ||
          item.property.Id.toLowerCase().includes("date")
      );

      const dependentProperty: any = propertySettings.find(
        (item: any) => item.property.Id !== independentProperty.property.Id
      );

      const independentPropertyData: any = data.find(
        (item: any) => item.sdsStreamId === independentProperty.sdsStreamId
      ).data;

      const dependentPropertyData: any = data.find(
        (item: any) => item.sdsStreamId === dependentProperty.sdsStreamId
      ).data;

      const size: number = Math.max(
        Object.values(independentPropertyData).length,
        Object.values(dependentPropertyData).length
      );

      const targetData: any[] = new Array(size)
        .fill(0)
        .map((_, index: number) => {
          return {
            x: (independentPropertyData[index] || {})[
              independentProperty.property.Id
            ],
            y: this.convertToNumber(
              (dependentPropertyData[index] || {})[
                dependentProperty.property.Id
              ]
            ),
          };
        });

      return {
        datasets: [
          {
            label: `${dependentProperty.property.Name}`,
            data: targetData,
            borderColor: "#3498db",
            backgroundColor: "transparent",
            borderWidth: 1,
            pointRadius: 1,
          },
        ],
      };
    },
    generateMapMarkers: function (propertySettings: any[], data: any[]) {
      const sdsStreamIds: any = Object.keys(
        propertySettings.reduce((acc: any, propertySetting: any) => {
          return {
            ...acc,
            [propertySetting.sdsStreamId]: (
              acc[propertySetting.sdsStreamId] || []
            ).concat(propertySetting),
          };
        }, {})
      );

      const mapMarkers: MapMarker[] = sdsStreamIds.flatMap(
        (sdsStreamId: string) => {
          const sdsStreamData: any[] = data.find(
            (item: any) => item.sdsStreamId == sdsStreamId
          ).data;

          return sdsStreamData
            .filter((item: any) => {
              const latitude: number = item.latitude || item.Latitude;
              const longitude: number = item.longitude || item.Longitude;

              return !!latitude && !!longitude;
            })
            .map((item: any, index: number) => {
              const latitude = Number(item.latitude || item.Latitude);
              const longitude = Number(item.longitude || item.Longitude);
              const color: string = randomStreamColour(sdsStreamId).hex;
              const markerStyle = `
              background-color: ${color};
              width: 1rem;
              height: 1rem;
              display: block;
              left: -0.5rem;
              top: -0.5rem;
              position: relative;
              border-radius: 3rem 3rem 0;
              transform: rotate(45deg);
              border: 1px solid #FFFFFF;
            `;

              return {
                coordinates: [latitude, longitude],
                html: `
              <div style="${markerStyle}"></div>
            `,
                popup: `
              <div>
                <strong>${sdsStreamId}</strong>
                <p>${item.timestamp || item.Timestamp}</p>
              </div>
            `,
                anchor: "bottom-left",
              };
            });
        }
      );

      return mapMarkers;
    },
    getLastValue: function (properties: any[], data: any): any {
      const propertySettings: any = properties[0];

      const values: any[] = data.find(
        (item: any) => item.sdsStreamId === propertySettings.sdsStreamId
      ).data;

      return values[values.length - 1];
    },
    computeMinimum: function (data: any[], property: any): number {
      return data.reduce((acc, item) => {
        const value = Number(item[property.Id] || 0);

        return value < acc ? item[property.Id] : acc;
      }, Infinity);
    },
    computeMaximum: function (data: any[], property: any): number {
      return data.reduce((acc, item) => {
        const value = Number(item[property.Id] || 0);

        return value > acc ? item[property.Id] : acc;
      }, -Infinity);
    },
    computeMean: function (data: any[], property: any): number {
      return (
        data.reduce((acc, item) => {
          const value = Number(item[property.Id] || 0);

          return acc + value;
        }, 0) / data.length
      );
    },
    computeSummation: function (data: any[], property: any): number {
      return data.reduce((acc, item) => {
        const value = Number(item[property.Id] || 0);

        return acc + value;
      }, 0);
    },
    computeInterpretation: function (
      data: any[],
      interpretation: VisualisationAttributeInterpretation,
      property: any
    ) {
      switch (interpretation) {
        case VisualisationAttributeInterpretation.CATEGORICAL: {
          return data.map((item) => ({
            ...item,
            [property.Id]: (item[property.Id] || "").toString(),
          }));
        }
        case VisualisationAttributeInterpretation.QUANTITATIVE: {
          return data.map((item) => ({
            ...item,
            [property.Id]: item[property.Id],
          }));
        }
        case VisualisationAttributeInterpretation.MINIMUM: {
          const minimum: number = this.computeMinimum(data, property);
          return data.map((item) => ({
            ...item,
            [property.Id]: minimum,
          }));
        }
        case VisualisationAttributeInterpretation.MAXIMUM: {
          const maximum: number = this.computeMaximum(data, property);
          return data.map((item) => ({
            ...item,
            [property.Id]: maximum,
          }));
        }
        case VisualisationAttributeInterpretation.MEAN: {
          const mean: number = this.computeMean(data, property);
          return data.map((item) => ({
            ...item,
            [property.Id]: mean,
          }));
        }
        case VisualisationAttributeInterpretation.SUMMATION: {
          const summation: number = this.computeSummation(data, property);
          return data.map((item) => ({
            ...item,
            [property.Id]: summation,
          }));
        }
        default:
          throw new Error(`Unexpected interpretation: ${interpretation}`);
      }
    },
    processData: function (data: any[], propertySettings: any[]) {
      return data.map((item) => {
        const currentPropertySettings = propertySettings.filter(
          (propertySetting) => propertySetting.sdsStreamId === item.sdsStreamId
        );

        let data = item.data;

        currentPropertySettings.forEach((currentPropertySetting) => {
          data = this.computeInterpretation(
            item.data,
            currentPropertySetting.interpretation,
            currentPropertySetting.property
          );
        });

        return {
          ...item,
          data,
        };
      });
    },
    update: function () {
      this.plot = undefined;
      this.map = undefined;
      this.mixedColour = this.generateColour(this.propertySettings);

      this.processedData = this.processData(this.data, this.propertySettings);

      setTimeout(() => {
        switch (this.visualisationType) {
          case BAR_CHART:
            if (this.isUnivariate) {
              const colour: string = randomStreamColour(
                this.propertySettings[0].sdsStreamId
              ).hex;
              this.plot = this.generateUnivariatePlot(
                this.propertySettings,
                this.processedData,
                colour
              );
            }
            break;
          case PIE_CHART:
            if (this.isUnivariate) {
              const colour: string = randomStreamColour(
                this.propertySettings[0].sdsStreamId
              ).hex;
              this.plot = this.generateUnivariatePlot(
                this.propertySettings,
                this.processedData,
                colour
              );
            }
            break;
          case HISTOGRAM:
            if (this.isUnivariate) {
              const colour: string = randomStreamColour(
                this.propertySettings[0].sdsStreamId
              ).hex;
              this.plot = this.generateUnivariatePlot(
                this.propertySettings,
                this.processedData,
                colour
              );
            }
            break;
          case SCATTER_PLOT:
            if (this.isBivariate) {
              this.plot = this.generateBivariateQuantitativeQuantitativePlot(
                this.propertySettings,
                this.processedData,
                this.mixedColour
              );
            }
            break;
          case LINE_PLOT:
            if (this.isBivariate) {
              this.plot = this.generateBivariateQuantitativeQuantitativePlot(
                this.propertySettings,
                this.processedData,
                this.mixedColour
              );
            }
            break;
          case TIME_SERIES:
            if (this.isTimeDependent) {
              this.plot = this.generateTimeSeriesPlot(
                this.propertySettings,
                this.processedData
              );
            }
            break;
          case MAP_TWO_DIMENSIONAL:
            if (this.isMappable) {
              this.map = this.generateMapMarkers(
                this.propertySettings,
                this.processedData
              );
            }
            break;
          case MAP_THREE_DIMENSIONAL:
            if (this.isMappable) {
              this.map = this.generateMapMarkers(
                this.propertySettings,
                this.processedData
              );
            }
            break;
          case MAP_VECTOR_CONTOUR:
            if (this.isMappable) {
              this.map = this.generateMapMarkers(
                this.propertySettings,
                this.processedData
              );
            }
            break;
          case MAP_HEAT:
            if (this.isMappable) {
              this.map = this.generateMapMarkers(
                this.propertySettings,
                this.processedData
              );
            }
            break;
          case MAP_ANIMATED_LINE:
            if (this.isMappable) {
              const sortedData: any[] = this.sortTemporalData(
                this.processedData
              );
              this.map = this.generateMapMarkers(
                this.propertySettings,
                sortedData
              );
            }
            break;
          case MAP_CAMERA_PATH:
            if (this.isMappable) {
              const sortedData: any[] = this.sortTemporalData(
                this.processedData
              );
              this.map = this.generateMapMarkers(
                this.propertySettings,
                sortedData
              );
            }
            break;
          case GAUGE_CHART: {
            const sortedData: any[] = this.sortTemporalData(this.processedData);
            const lastValue = this.getLastValue(
              this.propertySettings,
              sortedData
            );
            const lastValueProperty =
              lastValue[this.propertySettings[0].property.Id] || 0;

            this.plot = {
              lastValue: lastValueProperty,
              gaugeSettings: this.gaugeSettings,
            };

            break;
          }
          case LAST_VALUE: {
            const sortedData: any[] = this.sortTemporalData(this.processedData);
            const lastValue = this.getLastValue(
              this.propertySettings,
              sortedData
            );
            const lastValueProperty =
              lastValue[this.propertySettings[0].property.Id] || 0;

            const temporalProperty: any =
              this.processedData[0].assetStream.properties.find((item: any) => {
                return item.SdsType.SdsTypeCode === 16;
              });
            const lastValueTimestamp = lastValue[temporalProperty.Id];

            this.visualisationLastValue = {
              text: lastValueProperty.toString(),
              timestamp: lastValueTimestamp,
              property: this.propertySettings[0].property,
              name: this.name,
            };

            break;
          }
          default:
            console.error(
              `Unsupported visualisation: ${this.visualisationType}`
            );
        }
      });
    },
    sortTemporalData: function (data: any[]): any[] {
      return data
        .map((dataset: any) => {
          const temporalProperty: any = dataset.assetStream.properties.find(
            (item: any) => {
              return item.SdsType.SdsTypeCode === 16;
            }
          );

          if (!temporalProperty) {
            return;
          }

          const temporalPropertyId: string = temporalProperty.Id;

          return {
            ...dataset,
            data: dataset.data.concat().sort((a, b) => {
              const t1: string = a[temporalPropertyId];
              const t2: string = b[temporalPropertyId];

              return dayjs(t1).diff(dayjs(t2));
            }),
          };
        })
        .filter((x) => x);
    },
  },
  props: {
    name: String,
    visualisationType: String,
    propertySettings: {
      type: Array as PropType<any[]>,
      required: true,
    },
    data: {
      type: Array as PropType<any[]>,
      required: true,
    },
    bivariateSettings: {
      type: Object as PropType<any>,
      required: false,
    },
    gaugeSettings: {
      type: Object as PropType<IVisualisationGaugeSettings>,
      required: false,
    },
    onDelete: {
      type: Function as PropType<() => void>,
      required: false,
    },
    headerHidden: Boolean,
    columnCount: Number,
    columnSpan: Number,
    onChangeColumnSpan: {
      type: Function as PropType<(span: number) => void>,
      required: false,
    },
    onMoveLeft: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onMoveRight: {
      type: Function as PropType<() => void>,
      required: false,
    },
    maximised: Boolean,
    onToggleMaximise: {
      type: Function as PropType<() => void>,
      required: false,
    },
  },
  watch: {
    visualisationType: {
      handler: function () {
        this.update();
      },
      immediate: true,
      deep: true,
    },
    propertySettings: {
      handler: function () {
        this.update();
      },
      immediate: true,
      deep: true,
    },
    data: {
      handler: function () {
        this.update();
      },
      immediate: true,
      deep: true,
    },
    bivariateSettings: {
      handler: function () {
        this.update();
      },
      immediate: true,
      deep: true,
    },
    gaugeSettings: {
      handler: function () {
        this.update();
      },
      immediate: true,
      deep: true,
    },
  },
});
</script>

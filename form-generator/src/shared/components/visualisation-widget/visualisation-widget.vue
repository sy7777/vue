<template lang="html">
  <div
    class="card card-custom"
    :class="{
      'overflow-hidden': isMap,
    }"
  >
    <div class="card-header d-none d-md-block">
      <div class="card-title" v-if="name">
        <h3 class="card-label">{{ name }}</h3>
      </div>
      <div class="card-toolbar">
        <div
          class="btn-group btn-group-sm mr-4"
          role="group"
          aria-label="column span"
        >
          <button
            v-if="onMoveLeft"
            type="button"
            class="btn btn-outline-secondary font-weight-bold"
            v-on:click="onMoveLeft()"
          >
            <i class="flaticon2-left-arrow icon-sm text-secondary"></i>
          </button>
          <button
            v-if="columnCount > 1"
            type="button"
            class="btn font-weight-bold"
            :class="{
              'btn-outline-secondary': columnSpan !== 1,
              'btn-secondary': columnSpan === 1,
            }"
            v-on:click="onChangeColumnSpan(1)"
          >
            1
          </button>
          <button
            v-if="columnCount > 1"
            type="button"
            class="btn font-weight-bold"
            :class="{
              'btn-outline-secondary': columnSpan !== 2,
              'btn-secondary': columnSpan === 2,
            }"
            v-on:click="onChangeColumnSpan(2)"
          >
            2
          </button>
          <button
            v-if="columnCount > 2"
            type="button"
            class="btn font-weight-bold"
            :class="{
              'btn-outline-secondary': columnSpan !== 3,
              'btn-secondary': columnSpan === 3,
            }"
            v-on:click="onChangeColumnSpan(3)"
          >
            3
          </button>
          <button
            v-if="columnCount > 3"
            type="button"
            class="btn font-weight-bold"
            :class="{
              'btn-outline-secondary': columnSpan !== 4,
              'btn-secondary': columnSpan === 4,
            }"
            v-on:click="onChangeColumnSpan(4)"
          >
            4
          </button>
          <button
            v-if="onMoveRight"
            type="button"
            class="btn btn-outline-secondary font-weight-bold"
            v-on:click="onMoveRight()"
          >
            <i class="flaticon2-right-arrow icon-sm text-secondary"></i>
          </button>
        </div>
        <button
          v-if="!readOnly"
          type="button"
          class="btn btn-sm btn-icon btn-light-danger mr-2"
          v-on:click="onDelete"
        >
          <i class="flaticon2-delete"></i>
        </button>
        <button
          type="button"
          class="btn btn-sm btn-icon btn-light-info mr-2"
          v-on:click="toggleMaximise()"
        >
          <i class="flaticon2-arrow-1"></i>
        </button>
      </div>
    </div>
    <div
      class="card-body"
      :class="{
        'p-0': isMap,
        'pt-0': isPlot,
        'p-0': isLastValue,
      }"
    >
      <template v-if="!dataAvailable">
        <div class="alert alert-light">
          <h4 class="alert-heading">Data not found</h4>
          <hr />
          <p class="alert-text m-0">Try adjusting the search period.</p>
        </div>
      </template>
      <template v-else>
        <Visualisation
          v-if="!maximised"
          :visualisationType="visualisationType"
          :propertySettings="propertySettings"
          :data="data"
          :bivariateSettings="bivariateSettings"
          :gaugeSettings="gaugeSettings"
          :name="name"
          :headerHidden="true"
          :columnCount="columnCount"
          :columnSpan="columnSpan"
          :maximised="maximised"
          :onToggleMaximise="toggleMaximise"
        />
        <Teleport v-if="maximised" to="body">
          <Visualisation
            :visualisationType="visualisationType"
            :propertySettings="propertySettings"
            :data="data"
            :bivariateSettings="bivariateSettings"
            :gaugeSettings="gaugeSettings"
            :name="name"
            :headerHidden="true"
            :columnCount="columnCount"
            :columnSpan="columnSpan"
            :maximised="maximised"
            :onToggleMaximise="toggleMaximise"
          />
        </Teleport>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Visualisation } from "../visualisation";
import {
  IVisualisationGaugeSettings,
  IVisualisationGaugeSettingsRange,
  IVisualisationLastValue,
} from "@/shared/models";
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
  MAP_KML,
  GAUGE_CHART,
  TIME_SERIES,
  LAST_VALUE,
} from "@/shared/constants";

interface IData {
  dataAvailable: boolean;
  maximised: boolean;
}

export default defineComponent({
  components: {
    Visualisation,
  },
  computed: {
    isLastValue: function (): boolean {
      return this.visualisationType === LAST_VALUE;
    },
    isMap: function (): boolean {
      return [
        MAP_THREE_DIMENSIONAL,
        MAP_TWO_DIMENSIONAL,
        MAP_ANIMATED_LINE,
        MAP_ANIMATED_PATH,
        MAP_CAMERA_PATH,
        MAP_VECTOR_CONTOUR,
        MAP_HEAT,
        MAP_KML,
      ].includes(this.visualisationType);
    },
    isPlot: function (): boolean {
      return [
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
        GAUGE_CHART,
      ].includes(this.visualisationType);
    },
  },
  data: function (): IData {
    return {
      dataAvailable: false,
      maximised: false,
    };
  },
  methods: {
    checkDataAvailable: function (): boolean {
      return this.propertySettings.reduce(
        (available, propertySetting) =>
          available &&
          !!(
            (
              this.data.find(
                (dataset) => dataset.sdsStreamId === propertySetting.sdsStreamId
              ) || {}
            ).data || {}
          ).length,
        true
      );
    },
    update: function (): void {
      this.dataAvailable = this.checkDataAvailable();
    },
    toggleMaximise: function () {
      this.maximised = !this.maximised;

      if (this.maximised) {
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
  },
  props: {
    name: String,
    visualisationType: {
      type: String,
      required: true,
    },
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
    readOnly: Boolean,
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

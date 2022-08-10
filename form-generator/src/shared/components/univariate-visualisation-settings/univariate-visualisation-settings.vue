<template lang="html">
  <div>
    <h6>Univariate Visualisations</h6>

    <div v-if="!isNumerical">
      <button
        v-for="(visualisation, i) in categoricalVisualisations"
        type="button"
        class="btn btn-hover-primary font-weight-bold mr-2"
        v-on:click="onSelectVisualisation(visualisation)"
        :class="{
          'btn-light': selectedVisualisation !== visualisation,
          'btn-primary': selectedVisualisation === visualisation,
        }"
        :key="i"
      >
        {{ visualisation }}
      </button>
    </div>
    <div v-if="isNumerical">
      <button
        v-for="(visualisation, i) in quantitativeVisualisations"
        type="button"
        class="btn btn-hover-primary font-weight-bold mr-2"
        v-on:click="onSelectVisualisation(visualisation)"
        :class="{
          'btn-light': selectedVisualisation !== visualisation,
          'btn-primary': selectedVisualisation === visualisation,
        }"
        :key="i"
      >
        {{ visualisation }}
      </button>
    </div>
    <div v-if="selectedVisualisation === GAUGE_CHART">
      <div class="form-group row mt-5">
        <label for="gaugeVisualisationMinimum" class="col-sm-3 col-form-label">
          Minimum
        </label>
        <div class="col-sm-9">
          <input
            type="number"
            class="form-control"
            placeholder="0"
            :value="gaugeSettings.minimum"
            v-on:change="handleChangeGaugeSettingsMinimum"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Ranges</label>
        <div class="col-sm-9">
          <template v-for="range in gaugeSettings.ranges" :key="range.id">
            <div class="d-flex mt-2">
              <input
                type="number"
                class="form-control mr-2"
                placeholder="Value"
                :value="range.value"
                v-on:change="handleChangeGaugeSettingsRangeValue($event, range)"
              />
              <input
                type="color"
                placeholder="Colour"
                class="mr-2"
                :value="range.colourHex"
                v-on:change="
                  handleChangeGaugeSettingsRangeColour($event, range)
                "
              />
              <button
                type="button"
                class="btn btn-sm btn-light-danger"
                v-on:click="handleClickGaugeSettingsRemoveRange(range)"
              >
                Remove
              </button>
            </div>
          </template>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-sm btn-light-primary"
              v-on:click="handleClickGaugeSettingsAddRange"
            >
              Add Range
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { v4 as uuidv4 } from "uuid";

import {
  UnivariateCategorical,
  UnivariateQuantitative,
  GAUGE_CHART,
} from "@/shared/constants";
import {
  IVisualisationGaugeSettings,
  IVisualisationGaugeSettingsRange,
} from "@/shared/models";
import { VisualisationAttributeInterpretation } from "@/shared/constants";

interface IData {
  GAUGE_CHART: Readonly<string>;
}

export default defineComponent({
  computed: {
    isNumerical: function (): boolean {
      return (
        // @ts-ignore
        this.propertySetting.interpretation !==
        VisualisationAttributeInterpretation.CATEGORICAL
      );
    },
    propertySetting: function () {
      // @ts-ignore
      return this.propertySettings[0];
    },
    categoricalVisualisations: function () {
      return Object.values(UnivariateCategorical);
    },
    quantitativeVisualisations: function () {
      return Object.values(UnivariateQuantitative);
    },
  },
  data: function (): IData {
    return {
      GAUGE_CHART,
    };
  },
  methods: {
    handleChangeGaugeSettingsMinimum: function (event: Event): void {
      const minimum: number | null = Number(
        (event.target as HTMLInputElement).value
      );
      if (!minimum) {
        throw new Error(
          "Expected gauge visualisation settings minimum value to be a number"
        );
      }
      const newGaugeSettings: IVisualisationGaugeSettings = {
        ...this.gaugeSettings,
        minimum,
      };
      this.onChangeGaugeSettings(newGaugeSettings);
    },
    handleClickGaugeSettingsAddRange: function (): void {
      const newGaugeSettings: IVisualisationGaugeSettings = {
        ...this.gaugeSettings,
        ranges: this.gaugeSettings.ranges.concat({
          id: uuidv4(),
          value: this.gaugeSettings.minimum + 10,
          colourHex: "#F8F8F8",
        }),
      };

      this.onChangeGaugeSettings(newGaugeSettings);
    },
    handleClickGaugeSettingsRemoveRange: function (
      range: IVisualisationGaugeSettingsRange
    ): void {
      const newGaugeSettings: IVisualisationGaugeSettings = {
        ...this.gaugeSettings,
        ranges: this.gaugeSettings.ranges.filter(
          (item: IVisualisationGaugeSettingsRange) => item.id !== range.id
        ),
      };

      this.onChangeGaugeSettings(newGaugeSettings);
    },
    handleChangeGaugeSettingsRangeValue: function (
      event: Event,
      range: IVisualisationGaugeSettingsRange
    ): void {
      const value = Number((event.target as HTMLInputElement).value);
      if (!value) {
        throw new Error(
          "Expected gauge visualisation settings range value to be a number"
        );
      }
      const newGaugeSettings: IVisualisationGaugeSettings = {
        ...this.gaugeSettings,
        ranges: this.gaugeSettings.ranges.map(
          (item: IVisualisationGaugeSettingsRange) => {
            if (item.id === range.id) {
              return {
                ...item,
                value,
              };
            } else {
              return item;
            }
          }
        ),
      };
      this.onChangeGaugeSettings(newGaugeSettings);
    },
    handleChangeGaugeSettingsRangeColour: function (
      event: Event,
      range: IVisualisationGaugeSettingsRange
    ): void {
      const colourHex: string = (
        event.target as HTMLInputElement
      ).value.toString();
      const newGaugeSettings: IVisualisationGaugeSettings = {
        ...this.gaugeSettings,
        ranges: this.gaugeSettings.ranges.map(
          (item: IVisualisationGaugeSettingsRange) => {
            if (item.id === range.id) {
              return {
                ...item,
                colourHex,
              };
            } else {
              return item;
            }
          }
        ),
      };
      this.onChangeGaugeSettings(newGaugeSettings);
    },
  },
  props: {
    propertySettings: Array,
    selectedVisualisation: String,
    onSelectVisualisation: {
      type: Function as PropType<(visualisation: string) => void>,
      required: true,
    },
    gaugeSettings: {
      type: Object as PropType<IVisualisationGaugeSettings>,
      required: true,
    },
    onChangeGaugeSettings: {
      type: Function as PropType<
        (settings: IVisualisationGaugeSettings) => void
      >,
      required: true,
    },
  },
  watch: {
    propertySettings: {
      handler: function () {
        // @ts-ignore
        if (this.propertySettings.length !== 1) {
          throw new Error(
            "Univariate visualisation must be based on one property setting"
          );
        }
      },
      deep: true,
      immediate: true,
    },
  },
});
</script>

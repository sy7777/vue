<template lang="html">
  <div v-if="bivariateSettings">
    <h6>Bivariate Visualisations</h6>
    <div v-if="independentPropertyMandatory" class="mb-3">
      <label class="mr-2">Independent variable: </label>
      <span class="label label-inline label-dark">
        {{ bivariateSettings.independentPropertyId }}
      </span>
    </div>
    <div v-if="!independentPropertyMandatory" class="mb-3">
      <label class="mr-2">Independent variable: </label>
      <span
        v-for="propertySetting in propertySettings"
        class="label label-inline mr-3 cursor-pointer"
        :class="{
          'label-outline-dark':
            bivariateSettings.independentPropertyId !==
            propertySetting.property.Id,
          'label-dark':
            bivariateSettings.independentPropertyId ==
            propertySetting.property.Id,
        }"
        v-on:click="setIndependentVariable(propertySetting)"
        :key="propertySetting.property.Id"
      >
        {{ propertySetting.property.Name }}
      </span>
    </div>
    <div
      v-if="!bivariateSettings.independentPropertyId"
      class="alert alert-custom alert-light"
    >
      <div class="alert-text">
        Please select an independent variable to see charting options.
      </div>
    </div>
    <div v-if="bivariateSettings.independentPropertyId">
      <div v-if="isCategoricalCategorical">
        <button
          v-for="(visualisation, i) in categoricalCategoricalVisualisations"
          type="button"
          class="btn btn-hover-primary font-weight-bold mr-2 mb-2"
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
      <div v-if="isCategoricalQuantitative">
        <button
          v-for="(visualisation, i) in categoricalQuantitativeVisualisations"
          type="button"
          class="btn btn-hover-primary font-weight-bold mr-2 mb-2"
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
      <div v-if="isQuantitativeQuantitative">
        <button
          v-for="(visualisation, i) in quantitativeQuantitativeVisualisations"
          type="button"
          class="btn btn-hover-primary font-weight-bold mr-2 mb-2"
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import {
  BivariateCategoricalQuantitative,
  BivariateCategoricalCategorical,
  BivariateQuantitativeQuantitative,
} from "@/shared/constants";
import {
  canSupportBivariateVisualisations,
  generateDashboardPropertyUnitCode,
} from "@/shared/services";
import { VisualisationAttributeInterpretation } from "@/shared/constants";

export default defineComponent({
  computed: {
    isCategoricalCategorical: function (): boolean {
      const [independent, dependent] =
        this.getIndependentDependentPropertySettings();
      return (
        independent.interpretation ===
          VisualisationAttributeInterpretation.CATEGORICAL &&
        dependent.interpretation ===
          VisualisationAttributeInterpretation.CATEGORICAL
      );
    },
    categoricalCategoricalVisualisations: function (): string[] {
      return Object.values(BivariateCategoricalCategorical);
    },
    isCategoricalQuantitative: function (): boolean {
      const [independent, dependent] =
        this.getIndependentDependentPropertySettings();
      return (
        independent.interpretation ===
          VisualisationAttributeInterpretation.CATEGORICAL &&
        dependent.interpretation !==
          VisualisationAttributeInterpretation.CATEGORICAL
      );
    },
    categoricalQuantitativeVisualisations: function (): string[] {
      return Object.values(BivariateCategoricalQuantitative);
    },
    isQuantitativeQuantitative: function (): boolean {
      const [independent, dependent] =
        this.getIndependentDependentPropertySettings();
      return (
        independent.interpretation !==
          VisualisationAttributeInterpretation.CATEGORICAL &&
        dependent.interpretation !==
          VisualisationAttributeInterpretation.CATEGORICAL
      );
    },
    quantitativeQuantitativeVisualisations: function (): string[] {
      return Object.values(BivariateQuantitativeQuantitative);
    },
  },
  data: function () {
    return {
      independentPropertyMandatory: false,
    };
  },
  methods: {
    getIndependentDependentPropertySettings: function (): [any, any] {
      // @ts-ignore
      const independentPropertySetting: any = this.propertySettings.find(
        (item: any) =>
          // @ts-ignore
          item.property.Id === this.bivariateSettings.independentPropertyId
      );
      // @ts-ignore
      const dependentPropertySetting: any = this.propertySettings.find(
        (item: any) => item.id !== independentPropertySetting.id
      );

      return [independentPropertySetting, dependentPropertySetting];
    },
    setIndependentVariable: function (propertySetting: any) {
      this.onChange({
        ...this.bivariateSettings,
        independentPropertyId: propertySetting.property.Id,
      });
    },
    defaultBivariateSettings: function () {
      return {
        bivariateSettings: {
          independentPropertyId: null,
        },
      };
    },
  },
  props: {
    propertySettings: Array,
    bivariateSettings: Object,
    onChange: {
      type: Function as PropType<(settings: any) => void>,
      required: true,
    },
    selectedVisualisation: String,
    onSelectVisualisation: {
      type: Function as PropType<(visualisation: string) => void>,
      required: true,
    },
  },
  watch: {
    bivariateSettings: {
      handler: function () {
        if (!this.bivariateSettings) {
          this.onChange(this.defaultBivariateSettings());
        }
      },
      immediate: true,
      deep: true,
    },
    propertySettings: {
      handler: function () {
        const isBivariate: boolean = canSupportBivariateVisualisations(
          // @ts-ignore
          this.propertySettings
        );

        if (isBivariate) {
          // @ts-ignore
          const unitCodes: string[] = this.propertySettings.map(
            (setting: any) =>
              generateDashboardPropertyUnitCode(setting.property)
          );
          const unitSet: Set<string> = new Set(unitCodes);
          const distinctUnits: number = unitSet.size;

          // @ts-ignore
          if (this.propertySettings.length > 2 && distinctUnits > 1) {
            this.independentPropertyMandatory = true;

            // @ts-ignore
            const mandatoryIndependentProperty = this.propertySettings.find(
              (setting: any) => {
                const unitCode: string = generateDashboardPropertyUnitCode(
                  setting.property
                );
                const unitCodeCount: number = unitCodes.reduce(
                  (total: number, item: string) =>
                    unitCode === item ? total + 1 : total,
                  0
                );

                return unitCodeCount === 1;
              }
            );

            this.setIndependentVariable(mandatoryIndependentProperty);
          } else {
            this.independentPropertyMandatory = false;
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
});
</script>

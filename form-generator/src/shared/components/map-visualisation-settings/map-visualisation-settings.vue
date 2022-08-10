<template lang="html">
  <div>
    <h6>Map Visualisations</h6>
    <div>
      <button
        v-for="(visualisation, i) in visualisations"
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
    <template v-if="isTemporalData">
      <h6 class="mt-5">Animated Map Visualisations</h6>
      <div>
        <button
          v-for="(visualisation, i) in animatedVisualisations"
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
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import {
  MapVisualisations,
  AnimatedMapVisualisations,
} from "@/shared/constants";

interface IMapVisualisationSettingsData {
  isTemporalData: boolean;
}

export default defineComponent({
  computed: {
    visualisations: function (): string[] {
      return Object.values(MapVisualisations);
    },
    animatedVisualisations: function (): string[] {
      return Object.values(AnimatedMapVisualisations);
    },
  },
  data: function (): IMapVisualisationSettingsData {
    return {
      isTemporalData: false,
    };
  },
  props: {
    propertySettings: {
      type: Array as PropType<any[]>,
      required: true,
    },
    selectedVisualisation: String,
    onSelectVisualisation: {
      type: Function as PropType<(visualisation: string) => void>,
      required: true,
    },
  },
  watch: {
    propertySettings: {
      handler: function () {
        this.isTemporalData = this.propertySettings.reduce(
          (isTemporal: boolean, propertySetting: any) => {
            if (propertySetting.property.SdsType.SdsTypeCode === 16) {
              return true;
            } else {
              return isTemporal;
            }
          },
          false
        );
      },
      deep: true,
      immediate: true,
    },
  },
});
</script>

<template lang="html">
  <div>
    <h6>Time-Dependent Visualisations</h6>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { TimeVisualisations } from "@/shared/constants";

export default defineComponent({
  computed: {
    visualisations: function () {
      return Object.values(TimeVisualisations);
    },
  },
  props: {
    propertySettings: Array,
    selectedVisualisation: String,
    onSelectVisualisation: {
      type: Function as PropType<(visualisation: string) => void>,
      required: true,
    },
  },
});
</script>

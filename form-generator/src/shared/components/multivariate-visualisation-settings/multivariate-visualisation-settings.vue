<template lang="html">
  <div class="d-none">
    <h6>Multivariate Visualisations</h6>
    <div class="alert alert-custom alert-light">
      <div class="alert-text">Visualisations not found</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    propertySettings: Array,
  },
  watch: {
    propertySettings: {
      handler: function () {
        if (this.propertySettings && this.propertySettings.length < 3) {
          throw new Error(
            "Multivariate visualisations must be based on more than two property settings"
          );
        }
      },
      deep: true,
      immediate: true,
    },
  },
});
</script>

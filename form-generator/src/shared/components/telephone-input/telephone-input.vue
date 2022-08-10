<template lang="html">
  <vue-tel-input
    :value="value"
    defaultCountry="AU"
    class="form-control form-control-lg form-control-solid"
    :inputOptions="inputOptions"
    @open="open = true"
    @close="open = false"
    @input="onChange"
  >
    <template v-slot:arrow-icon>
      <span>{{ open ? "▲" : "▼" }}</span>
    </template>
  </vue-tel-input>
</template>

<style lang="scss">
.vue-tel-input {
  input {
    background: transparent;
  }
}
</style>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface IData {
  open: boolean;
  inputOptions: Record<string, unknown>;
}

export default defineComponent({
  data: function (): IData {
    return {
      open: false,
      inputOptions: {
        styleClasses: "d-none",
      },
    };
  },
  props: {
    value: String,
    onChange: {
      type: Function as PropType<(newValue: string) => void>,
      required: true,
    },
  },
});
</script>

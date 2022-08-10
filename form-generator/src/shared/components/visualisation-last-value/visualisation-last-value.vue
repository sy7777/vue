<template lang="html">
  <div class="d-block d-md-none">
    <div class="d-flex justify-content-between w-100 p-5">
      <div class="d-flex flex-column m-0" style="font-size: 1.2rem">
        <template v-if="visualisationLastValue.name">
          <strong>
            {{ visualisationLastValue.name }}
          </strong>
          <small class="text-muted">
            {{ visualisationLastValue.property.Name }}
          </small>
        </template>
        <strong v-else>
          {{ visualisationLastValue.property.Name }}
        </strong>
      </div>
      <p
        class="text-dark m-0 ml-2 d-flex align-items-center"
        style="font-size: 1.2rem"
      >
        {{ formatted }}
      </p>
    </div>
  </div>
  <div class="d-none d-md-block">
    <div class="card-header border-0 pt-6">
      <h3 class="card-title">
        {{ visualisationLastValue.property.Name }}
      </h3>
    </div>
    <div
      class="card-body d-flex align-items-center justify-content-between flex-wrap"
    >
      <span class="font-weight-bolder display5 text-dark-75 py-4 pl-5 pr-5">
        {{ formatted }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IVisualisationLastValue } from "@/shared/models";

export default defineComponent({
  computed: {
    formatted: function (): string {
      if (this.visualisationLastValue.property.SdsType.SdsTypeCode === 16) {
        const d = new Date(this.visualisationLastValue.text);

        return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
      }

      const maybeUom: string | undefined =
        this.visualisationLastValue.property.Uom;
      const formattedUom: string = maybeUom ? ` ${maybeUom}` : "";

      if (this.isNumeric(this.visualisationLastValue.text)) {
        const rounded: number =
          Math.round(
            (Number(this.visualisationLastValue.text) + Number.EPSILON) * 100
          ) / 100;
        return `${rounded}${formattedUom}`;
      } else {
        return `${this.visualisationLastValue.text}${formattedUom}`;
      }
    },
  },
  methods: {
    isNumeric: function (str: any) {
      if (typeof str !== "string") {
        return false;
      }

      return (
        // @ts-ignore
        !isNaN(str) && !isNaN(parseFloat(str))
      );
    },
  },
  props: {
    visualisationLastValue: {
      type: Object as PropType<IVisualisationLastValue>,
      required: true,
    },
  },
});
</script>

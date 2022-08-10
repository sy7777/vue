<template lang="html">
  <modal :visible="visible" :toggle="toggle" title="Edit dashboard" size="xl">
    <template v-if="dashboardCopy">
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Name</label>
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control"
            v-model="dashboardCopy.name"
            placeholder="Dashboard name"
          />
        </div>
      </div>
    </template>
    <div class="modal-footer">
      <button type="button" class="btn btn-light mr-3" v-on:click="toggle">
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-warning"
        v-on:click="handleClickSubmit"
        :disabled="!dashboardCopy.name"
      >
        Submit
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IDashboard } from "@/shared/models";

interface IData {
  dashboardCopy: IDashboard | undefined;
}

export default defineComponent({
  data: function (): IData {
    return {
      dashboardCopy: undefined,
    };
  },
  methods: {
    handleClickSubmit: function (): void {
      if (this.dashboardCopy) {
        this.onEditDashboard(this.dashboardCopy);
      }
    },
  },
  props: {
    visible: Boolean,
    toggle: {
      type: Function as PropType<() => void>,
      required: true,
    },
    dashboard: {
      type: Object as PropType<IDashboard>,
      required: true,
    },
    onEditDashboard: {
      type: Function as PropType<(dashboard: IDashboard) => void>,
      required: true,
    },
  },
  watch: {
    dashboard: {
      handler: function () {
        if (this.dashboard) {
          this.dashboardCopy = JSON.parse(JSON.stringify(this.dashboard));
        }
      },
      immediate: true,
      deep: true,
    },
  },
});
</script>

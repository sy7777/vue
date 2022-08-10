<template lang="html">
  <modal :visible="visible" :toggle="toggle" title="Save Dashboard" size="xl">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="alert alert-light">
            <h4 class="alert-heading">
              Creating a new dashboard based on asset with name:
              <span class="font-weight-bolder">{{ dashboard.asset.name }}</span>
            </h4>
            <hr />
            <p class="alert-text">
              This dashboard will be based on the selected Asset and will save
              widget configuration.
            </p>
          </div>
        </div>
      </div>
      <div class="form-group row mt-5">
        <label class="col-md-3 col-form-label">Name </label>
        <div class="col-md-9">
          <input
            type="text"
            class="form-control"
            placeholder="Name for dashboard..."
            :value="dashboard.name"
            v-on:change="handleChangeDashboardName"
          />
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-light" v-on:click="toggle()">
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-success ml-5"
        v-on:click="onSaveDashboard"
        :disabled="!dashboard.name"
      >
        Submit
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import _ from "lodash";

import { IDashboard } from "@/shared/models";

export default defineComponent({
  methods: {
    handleChangeDashboardName: function (event: any) {
      const newDashboard: IDashboard = {
        ...this.dashboard,
        name: event.target.value,
      };

      this.onChangeDashboard(newDashboard);
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
    onChangeDashboard: {
      type: Function as PropType<(dashboard: IDashboard) => void>,
      required: true,
    },
    onSaveDashboard: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
});
</script>

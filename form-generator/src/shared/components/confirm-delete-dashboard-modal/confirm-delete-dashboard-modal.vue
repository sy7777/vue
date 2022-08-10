<template lang="html">
  <modal title="Confirm Dashboard Deletion" :visible="visible">
    <div>
      <p class="m-0">
        Confirm you wish to delete a dashboard with name:
        <span class="font-weight-bold">{{ dashboard.name }}</span>
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-light mr-3" v-on:click="toggle()">
        Cancel
      </button>
      <button type="button" class="btn btn-danger" v-on:click="onDelete">
        Delete
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IDashboard } from "@/shared/models";

export default defineComponent({
  props: {
    visible: Boolean,
    toggle: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<() => void>,
      required: true,
    },
    dashboard: {
      type: Object as PropType<IDashboard>,
      required: true,
    },
  },
});
</script>

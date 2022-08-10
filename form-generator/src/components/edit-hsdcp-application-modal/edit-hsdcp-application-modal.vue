<template lang="html">
  <modal :visible="visible" :toggle="toggle" title="Edit HSDCP Application">
    <div class="modal-body">
      <div class="form-group row">
        <label for="inputDpirdReference" class="col-sm-3 col-form-label"
          >DPIRD Reference</label
        >
        <div class="col-sm-9">
          <input
            id="inputDpirdReference"
            type="text"
            class="form-control"
            v-model="pendingApplication.dpirdReference"
            placeholder="DPIRD Reference"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Status</label>
        <div class="col-sm-9">
          <dropdown v-bind:text="statusDropdownText" variant="primary">
            <dropdown-item-button
              v-for="status in statuses"
              v-on:click="pendingApplication.status = status"
              :key="status"
            >
              {{ status }}
            </dropdown-item-button>
          </dropdown>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-light mr-3" v-on:click="toggle()">
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-success"
        @click="handleSubmit"
      >
        Submit
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface IData {
  pendingApplication: any;
  statuses: string[];
}

export default defineComponent({
  computed: {
    statusDropdownText: function(): string {
      return this.pendingApplication.status ? this.pendingApplication.status : 'Select a status';
    },
  },
  data: function(): IData {
    return {
      pendingApplication: undefined,
      statuses: [
        'PENDING',
        'COMPLETED',
        'REJECTED',
        'APPROVED',
      ],
    };
  },
  methods: {
    handleSubmit: function(): void {
      this.onSubmit(this.pendingApplication);
    },
  },
  props: {
    visible: Boolean,
    toggle: {
      type: Function as PropType<() => void>,
      required: true,
    },
    application: {
      type: Object as PropType<any>,
      required: true,
    },
    onSubmit: {
      type: Function as PropType<(application: any) => void>,
      required: true,
    },
  },
  watch: {
    application: {
      handler: function(): void {
        this.pendingApplication = JSON.parse(JSON.stringify(this.application));
      },
      immediate: true,
      deep: true,
    },
  },
});
</script>

<template lang="html">
  <modal :visible="visible" :toggle="toggle" title="Stream" size="lg">
    <div class="modal-body">
      <div class="form-group row">
        <label for="inputID" class="col-sm-3 col-form-label">ID</label>
        <div class="col-sm-9">
          <input
            id="inputID"
            type="text"
            class="form-control-plaintext"
            :value="sdsStream.Id"
            readonly
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="inputName" class="col-sm-3 col-form-label">Name</label>
        <div class="col-sm-9">
          <input
            id="inputName"
            type="text"
            class="form-control-plaintext"
            :value="sdsStream.Name"
            readonly
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="inputDescription" class="col-sm-3 col-form-label"
          >Description</label
        >
        <div class="col-sm-9">
          <input
            id="inputDescription"
            type="text"
            class="form-control-plaintext"
            :value="sdsStream.Description"
            readonly
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="inputType" class="col-sm-3 col-form-label">Type</label>
        <div class="col-sm-9">
          <input
            id="inputType"
            type="text"
            class="form-control-plaintext"
            :value="sdsStream.TypeId"
            readonly
          />
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-light mr-3" v-on:click="toggle">
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

import { ISdsStream } from "@/models";

export default defineComponent({
  props: {
    visible: Boolean,
    toggle: {
      type: Function as PropType<() => void>,
      required: true,
    },
    sdsStream: {
      type: Object as PropType<ISdsStream>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
});
</script>

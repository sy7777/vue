<template lang="html">
  <modal
    :visible="visible"
    :toggle="toggle"
    title="Confirm Removal of Exchange Token"
  >
    <div class="modal-body">
      <p class="m-0">
        Confirm you wish to remove an exchange token with name:
        <span class="font-weight-bold">{{ exchangeToken.name }}</span>
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-light mr-3" v-on:click="toggle()">
        Cancel
      </button>
      <button type="button" class="btn btn-danger" v-on:click="onSubmit">
        Remove
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    visible: Boolean,
    toggle: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onSubmit: {
      type: Function as PropType<() => void>,
      required: true,
    },
    exchangeToken: {
      type: Object as PropType<any>,
      required: true,
    },
  },
});
</script>

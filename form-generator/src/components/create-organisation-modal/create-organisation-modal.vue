<template lang="html">
  <modal :visible="visible" :toggle="toggle" title="Create Organisation">
    <div class="modal-body">
      <div class="form-group row">
        <label for="inputName" class="col-sm-3 col-form-label">Name</label>
        <div class="col-sm-9">
          <input
            id="inputName"
            type="text"
            class="form-control"
            v-model="name"
            placeholder="Name"
          />
          <small class="text-muted">
            Enter a name to help identify this organisation
          </small>
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
            class="form-control"
            v-model="description"
            placeholder="Description"
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
        class="btn btn-success"
        v-on:click="handleSubmit()"
        :disabled="isInvalid"
      >
        Submit
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface IData {
  name: string;
  description: string;
}

export default defineComponent({
  computed: {
    isInvalid: function (): boolean {
      return !this.name;
    },
  },
  data: function (): IData {
    return {
      name: "",
      description: "",
    };
  },
  methods: {
    handleSubmit: function (): void {
      this.onSubmit({
        name: this.name,
        description: this.description,
      });
    },
  },
  props: {
    visible: Boolean,
    toggle: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onSubmit: {
      type: Function as PropType<
        ({ name, description }: { name: string; description: string }) => void
      >,
      required: true,
    },
  },
});
</script>

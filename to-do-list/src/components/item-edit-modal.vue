<template>
  <div class="modal-body">
    <form @submit.prevent="submitEdit">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          type="name"
          class="form-control"
          id="name"
          aria-describedby="item name"
          v-model="name"
        />
      </div>
      <div class="mb-3">
        <label for="due" class="form-label">Due Date</label>
        <Datepicker v-model="dueDate" position="left" :time-picker-component="timePicker" />
      </div>
      <button class="btn btn-primary" @click="submitEdit">
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { IItem } from "@/models";
import { defineComponent, PropType, defineAsyncComponent } from "vue";
// Lazy load the component we want to pass
const TimePicker = defineAsyncComponent(() => import("./time-picker.vue"));
export default defineComponent({
  name: "ItemEditModal",
  created() {
    this.name = this.singleItem.name;
    this.dueDate = this.singleItem.dueDate;
  },
  data() {
    return {
      name: "",
      dueDate: new Date(),
      timePicker: TimePicker,
    };
  },
  props: {
    singleItem: { type: Object as PropType<IItem>, required: true },
    onEdit: {
      type: Function as PropType<(item: IItem) => void>,
      required: true,
    },
  },
  methods: {
    submitEdit() {
      this.onEdit({
        ...this.singleItem,
        name: this.name,
        dueDate: this.dueDate,
      });
    },
  },
});
</script>

<style></style>

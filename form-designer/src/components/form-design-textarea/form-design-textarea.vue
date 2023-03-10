<template>
  <div class="form-group mb-1">
    <label  v-if="schema?.title">{{ schema?.title }}</label>
    <textarea
      class="form-control"
      :placeholder="schema?.placeholder"
      rows="3"
      v-model="value"
    ></textarea>
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { FormControlJsonSchema } from "@/models";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "FormDesignTextarea",
  props: {
    schema: { type: Object as PropType<FormControlJsonSchema> },
    modelValue: {
      type: String as PropType<string>,
      default: (props: any) => {
        // console.log(props);
      },
    },
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit("update:modelValue", value);
      },
    },
  },
});
</script>

<template>
  <div class="form-group">
    <label v-if="schema?.title">{{schema?.title}}</label>
    <input
      type="text"
      class="form-control"     
      :placeholder="schema?.placeholder"
      v-model="value"
    />
    <!-- <span class="form-text text-muted"
        >We'll never share your email with anyone else.</span
      > -->
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { FormControlJsonSchema, FormJsonSchema } from "@/models";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "Input",
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

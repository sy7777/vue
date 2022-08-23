<template>
  <div class="form-group mb-1">
    <span>{{ schema?.title }}</span>
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { FormControlJsonSchema } from "@/models";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "FormDesignText",
  props: {
    schema: { type: Object as PropType<FormControlJsonSchema> },
    modelValue: {
      type: String as PropType<string>,
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
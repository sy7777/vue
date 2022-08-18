<template>
  <div class="form-group">
    <label>{{ schema?.title }}</label>
    <div class="checkbox-inline" v-for="option in schema?.options">
      <label class="checkbox checkbox-rounded">
        <input type="checkbox" :value="option.value" v-model="value" />
        <span></span>
        {{ option.value }}
      </label>
    </div>
    <!-- <span class="form-text text-muted">Some help text goes here</span> -->
  </div>
</template>

<script lang="ts">
import { FormJsonSchema } from "@/models";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    schema: { type: Object as PropType<FormJsonSchema> },
    modelValue: {
      type: [Array, Boolean] as PropType<string[] | boolean>,
      default: (props:any)=>{
        if(props?.schema?.options?.length > 1){
          return [];
        }
        return false;
      },
    },
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: string[] | boolean) {
        this.$emit("update:modelValue", value);
      },
    },
  },
});
</script>

<style scoped>
.checkbox > input:checked ~ span {
  background-color: #25623f;
}
.checkbox > input:checked ~ span:after {
  border-color: #ffffff;
}
.checkbox > input:checked ~ span:after {
  display: block;
}
.checkbox > span:after {
  width: 5px;
  height: 10px;
}
</style>

<template>
  <div class="form-group">
    <label>{{schema?.title}}</label>
    <div class="radio-inline" v-for="option in schema?.options">
      <label class="radio">
        <input type="radio" :value="option.value" v-model="value"/>
        <span></span>
        {{option.name}}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { FormControlJsonSchema } from "@/models";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    schema: { type: Object as PropType<FormControlJsonSchema> },
    modelValue: {
      type: [Array, Boolean] as PropType<string[] | boolean>,
      default: (props:any)=>{
        console.log(props,"2222");
        
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

<style scoped></style>

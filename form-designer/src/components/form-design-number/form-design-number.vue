<template>
  <div class="form-group">
    <label  v-if="schema?.title">{{schema?.title}}</label>
    <input
      type="number"
      class="form-control"
      :placeholder="schema?.placeholder"
      v-model="value"
    />
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { FormControlJsonSchema } from "@/models";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "Number",
  props: {
    schema: { type: Object as PropType<FormControlJsonSchema> },
    modelValue:{
      type: Number as PropType<number>,
      // type: String as PropType<string>,
      // default: 0,
    }
  },
  emits:["update:modelValue"],
  computed:{
    value:{
      get(){
        return this.modelValue;
      },
      set(value: number){
        this.$emit("update:modelValue", value)
      }
    }
  }
});
</script>

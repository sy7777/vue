<template>
  <div class="form-group">
    <label>{{schema?.title}}</label>
    <div class="radio-inline">
      <label class="radio" v-for="option in schema?.options">
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

<style scoped>
.radio > input:checked ~ span {
  background-color: #25623f;
}
.radio > input:checked ~ span:after {
  border-color: #25623f;
}
.radio > input:checked ~ span:after {
  display: block;
}
.radio > span:after {
  width: 5px;
  height: 10px;
}
label {
  display: inline-block;
  /* width: 100px; */
  text-align: left;
  line-height: 26px;
  padding: 2px;
}
label input[type="radio"] {
  display: none;
}
label input[type="radio"] + span {
  box-sizing: border-box;
  display: inline-block;
  width: 20px;
  height: 20px;
  padding: 2px;
  border: 2px solid #25623f;
  vertical-align: sub;
  margin-right: 5px;
  border-radius: 50%;
}
label input[type="radio"] + span > span {
  display: inline-block;
  width: 12px;
  height: 12px;
  float: left;
  background: #25623f;
  opacity: 0;
}
label input[type="radio"]:checked + span {
  border-color: #25623f;
}
label:hover input[type="radio"] + span > span {
  opacity: 0.5;
}
label input[type="radio"]:checked + span > span {
  opacity: 1;
}
</style>

<template>
  <div class="form-group">
    <label  v-if="schema?.title">{{ schema?.title }}</label>
    <div class="checkbox-inline">
      <label
        class="checkbox checkbox-rounded"
        v-for="option in schema?.options"
      >
        <input type="checkbox" :value="option.value" v-model="value" />
        <span class="checkmark"></span>
        <span v-if="option.name">{{ option.name }}</span>
      </label>
    </div>
    <!-- <span class="form-text text-muted">Some help text goes here</span> -->
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
      default: (props: any) => {
        if (props?.schema?.options?.length > 1) {
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
        console.log(value);
        
        this.$emit("update:modelValue", value);
      },
    },
  },
});
</script>


<style scoped>
.checkbox {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 17px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #f3f5f9;
  border: 2px solid #25623f;
  border-radius: 3px;
  margin-top: 2px;
}

/* On mouse-over, add a grey background color */
.checkbox:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox input:checked ~ .checkmark {
  background-color: #25623f;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator tick */
.checkbox .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>

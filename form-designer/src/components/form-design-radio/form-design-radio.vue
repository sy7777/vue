<template>
  <div class="form-group">
    <label v-if="schema?.title">{{ schema?.title }}</label>
    <div class="radio-inline">
      <label class="radio" v-for="option in schema?.options">
        <input type="radio" :value="option.value" v-model="value" />
        <span class="checkmark"></span>
        <span v-if="option.name">{{ option.name }}</span>
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
/* .radio > input:checked ~ span {
  background-color: #25623f;
} */
/* The radio */
.radio {
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

/* Hide the browser's default radio button */
.radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #f3f5f9;
  border: 2px solid #25623f;
  border-radius: 50%;
  margin-top: 2px;
}

/* On mouse-over, add a grey background color */
.radio:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.radio input:checked ~ .checkmark {
  background-color: #25623f;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.radio input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.radio .checkmark:after {
 	top: 4px;
	left: 4px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: white;
}
</style>

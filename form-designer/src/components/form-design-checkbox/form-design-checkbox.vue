<template>
  <div class="form-group">
    <label>{{ schema?.title }}</label>
    <div class="checkbox-inline">
      <label
        class="checkbox checkbox-rounded"
        v-for="option in schema?.options"
      >
        <input type="checkbox" :value="option.value" v-model="value" />
        <span></span>
        {{ option.name }}
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
        console.log(props, "111");

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
        this.$emit("update:modelValue", value);
      },
    },
  },
});
</script>

<style scoped>
.checkbox > input:checked ~ span {
  background-color: #fff;
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
/* input[type="checkbox"] {
    border-radius: .2em;
  }
  
  input[type="checkbox"]:after {
    content: '\2714';
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    color:#000;
    font-size: 2.5em;
    font-family: meiryo, "sans-serif";
    opacity: 0;
    transition: all .1s ease;
    transform: translate(-50%, -50%) scale3d(.2, .2, 1);
    transform-origin: center center;
  }
  
  input[type="checkbox"]:checked:after {
    opacity: 1;
    transform: translate(-50%, -50%) scale3d(1.2, 1.2, 1);
  } */
label {
  display: inline-block;
  width: 100px;
  text-align: left;
  line-height: 26px;
}
label input[type="checkbox"] {
  display: none;
}
/* label input[type="checkbox"]::after {
  display: none;
  content: '\2714';
} */
label input[type="checkbox"] + span {
  box-sizing: border-box;
  display: inline-block;
  width: 20px;
  height: 20px;
  padding: 2px;
  border: 2px solid #25623f;
  vertical-align: sub;
  margin-right: 5px;
}
label input[type="checkbox"] + span > span {
  display: inline-block;
  width: 12px;
  height: 12px;
  float: left;
  background: #25623f;
  opacity: 0;
}
label input[type="checkbox"]:checked + span {
  border-color: #25623f;
}
label:hover input[type="checkbox"] + span > span {
  opacity: 0.5;
}
label input[type="checkbox"]:checked + span > span {
  opacity: 1;
}


</style>

<template>
  <div
    class="form-control-wrapper row"
    @mouseover="showControlOption = true"
    @mouseleave="showControlOption = false"
  >
    <span class="control-view col-md-8">
      <slot></slot>
    </span>
    <span class="control-option-container col-md-1" :class="getControlOptionClass()">
      <i class="bi bi-gear" @click="editSchema()"></i>
      <i class="bi bi-trash" @click="deleteSchema()"></i>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormControlWrapper",
  //   props: {
  //     msg: String,
  //   },
  data() {
    return {
      showControlOption: false,
    };
  },
  methods: {
    getControlOptionClass() {
      return {
        show: this.showControlOption,
      };
    },
    deleteSchema(){
      this.$emit("onDelSchema")
    },
    editSchema(){
      this.$emit("onEditSchema")
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.control-option-container {
  position: absolute;
  top: 0;
  left: 77%;
  border: 1px solid #bdc3c7;
  background-color: #fff;
  display: none;
}
.control-option-container.show {
  display: block;
}
.form-control-wrapper {
  position: relative;
  margin-top: 10px;
  padding-left: 0;
}
.control-view {
  padding: 10px;
  border: 1px solid transparent;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
</style>

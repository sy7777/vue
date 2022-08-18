<template>
  <div
    class="form-control-wrapper row d-flex justify-content-center"
    @mouseover="showControlOption = true"
    @mouseleave="showControlOption = false"
  >
    <span class="control-view col-md-8">
      <slot></slot>
    </span>
    <span
      class="control-option-container col-md-1"
      :class="getControlOptionClass()"
    >
      <div class="d-flex flex-column align-self-center justify-content-center">
        <i class="bi bi-arrows-move"></i>
        <i class="bi bi-gear" @click="editSchema()"></i>
        <i class="bi bi-trash" @click="deleteSchema()"></i>
      </div>
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
    deleteSchema() {
      this.$emit("onDelSchema");
    },
    editSchema() {
      this.$emit("onEditSchema");
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.control-option-container {
  position: absolute;
  border: 1px solid #25623f;
  background-color: #25623f;
  display: none;
  text-align: center;
  left: 84%;
}
.control-option-container.show {
  display: block;
  /* height: 66px; */
  /* line-height: 66px; */
}
.form-control-wrapper {
  position: relative;
  padding-left: 0;
}
.control-view {
  padding: 10px;
  border: 1px solid transparent;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
i {
  color: #fff;
  cursor: pointer;
}
</style>

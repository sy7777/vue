<template>
  <div
    class="form-control-wrapper row d-flex justify-content-center"
    @mouseover="showControlOption = true"
    @mouseleave="showControlOption = false"
  >
    <span class="control-view col-8">
      <slot></slot>
    </span>

    <span
      class="control-option-container col-1"
      :class="getControlOptionClass()"
    >
      <div class="d-flex flex-column align-items-center justify-content-center">
        <i class="bi bi-arrows-move drag-handle"></i>
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
  right: .7%;
  top: 15%;
  /* text-align: center; */
  /* left: 84%; */
}
.control-option-container.show {
  display: block;
  height: 72px;
  /* line-height: 66px; */
}
.form-control-wrapper {
  position: relative;
  padding-left: 0;
  width: 100%;
}
.control-view {
  padding: 10px;
  border: 1px solid transparent;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  width: 85%;
}
i {
  color: #fff;
  cursor: pointer;
}
</style>

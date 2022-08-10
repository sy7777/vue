<template lang="html">
  <div
    class="modal fade"
    :class="{ show: visible }"
    :style="{ display: visible ? 'block' : 'none' }"
    tabindex="-1"
    role="dialog"
    v-clickout="handleClickout"
  >
    <div class="modal-dialog" :class="modalSize" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
  <div
    v-if="visible"
    class="modal-backdrop fade"
    :class="{ show: visible }"
  ></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface IData {
  modalSize: string;
}

export default defineComponent({
  data: function (): IData {
    return {
      modalSize: "",
    };
  },
  props: {
    visible: Boolean,
    toggle: {
      type: Function as PropType<() => void>,
      required: true,
    },
    size: String,
    title: String,
  },
  watch: {
    size: {
      handler: function () {
        switch (this.size) {
          case "lg":
            this.modalSize = "modal-lg";
            break;
          case "sm":
            this.modalSize = "modal-sm";
            break;
          default:
            this.modalSize = "";
            break;
        }
      },
      immediate: true,
      deep: true,
    },
    visible: {
      handler: function () {
        if (this.visible) {
          document.body.classList.add("modal-open");
        } else {
          document.body.classList.remove("modal-open");
        }
      },
      immediate: true,
      deep: true,
    },
  },
});
</script>

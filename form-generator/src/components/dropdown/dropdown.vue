<template lang="html">
  <div class="dropdown">
    <button
      class="btn dropdown-toggle"
      :class="[btnClass, btnSize]"
      type="button"
      id="dropdownMenuButton"
      v-on:click="toggle"
    >
      {{ text }}
    </button>
    <div
      class="dropdown-menu"
      :class="{ show: visible }"
      v-clickout="handleClickout"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface IData {
  btnClass: string;
  btnSize: string;
  visible: boolean;
}

export default defineComponent({
  data: function (): IData {
    return {
      btnClass: "btn-secondary",
      btnSize: "",
      visible: false,
    };
  },
  methods: {
    toggle: function (): void {
      this.visible = !this.visible;
    },
    handleClickout: function (event): void {
      if (!this.$el.contains(event.target)) {
        this.visible = false;
      }
    },
  },
  props: {
    text: String,
    variant: String,
    size: String,
  },
  watch: {
    size: {
      handler: function () {
        switch (this.size) {
          case "lg":
            this.btnSize = "btn-lg";
            break;
          default:
            this.btnSize = "";
            break;
        }
      },
      immediate: true,
      deep: true,
    },
    variant: {
      handler: function () {
        switch (this.variant) {
          case "primary":
            this.btnClass = "btn-primary";
            break;
          case "secondary":
            this.btnClass = "btn-secondary";
            break;
          case "warning":
            this.btnClass = "btn-warning";
            break;
          case "danger":
            this.btnClass = "btn-danger";
            break;
          case "info":
            this.btnClass = "btn-info";
            break;
          case "dark":
            this.btnClass = "btn-dark";
            break;
          default:
            this.btnClass = "btn-secondary";
            break;
        }
      },
      deep: true,
      immediate: true,
    },
  },
});
</script>

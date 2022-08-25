<template>
  <div>
    <ul
      :id="elementId"
      class="vue-simple-context-menu"
      v-click-outside="onClickOutside"
    >
      <li
        v-for="(option, index) in options"
        :key="index"
        @click.stop="optionClicked(option)"
        class="vue-simple-context-menu__item"
        :class="[
          option.class,
          option.type === 'divider' ? 'vue-simple-context-menu__divider' : '',
        ]"
      >
        <span v-html="option.name" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import vClickOutside from "click-outside-vue3";
import { defineComponent, PropType } from "vue";
interface OptionClass {
  class: string;
  type: string;
  name: string;
}
interface IData {
  item: any;
  menuHeight: number | null;
  menuWidth: number | null;
}
export default defineComponent({
  name: "VueSimpleContextMenu",
  props: {
    elementId: {
      type: String,
      required: true,
    },
    options: {
      type: Array as PropType<OptionClass[]>,
      required: true,
    },
  },
  emits: ["menu-closed", "option-clicked"],
  directives: {
    "click-outside": vClickOutside.directive,
  },
  data(): IData {
    return {
      item: null,
      menuHeight: null,
      menuWidth: null,
    };
  },
  methods: {
    showMenu(event: any, item: any) {
      // console.log(item, "this is item");
      // console.log(event, "21321344");
      this.item = item;
      var menu = document.getElementById(this.elementId);
      if (!menu) {
        return;
      }
      if (!this.menuWidth || !this.menuHeight) {
        menu.style.visibility = "hidden";
        menu.style.display = "block";
        this.menuWidth = menu.offsetWidth;
        this.menuHeight = menu.offsetHeight;
        menu.removeAttribute("style");
      }
      if (this.menuWidth + event.pageX >= window.innerWidth) {
        menu.style.left = event.pageX - this.menuWidth + 2 + "px";
      } else {
        menu.style.left = event.pageX - 2 + "px";
      }
      if (this.menuHeight + event.pageY >= window.innerHeight) {
        menu.style.top = event.pageY - this.menuHeight + 2 + "px";
      } else {
        menu.style.top = event.pageY - 2 + "px";
      }
      menu.classList.add("vue-simple-context-menu--active");
    },
    hideContextMenu() {
      const element = document.getElementById(this.elementId);
      if (element) {
        element.classList.remove("vue-simple-context-menu--active");
        this.$emit("menu-closed");
      }
    },
    onClickOutside() {
      this.hideContextMenu();
    },
    optionClicked(option: OptionClass) {
      this.hideContextMenu();
      this.$emit("option-clicked", {
        item: this.item,
        option: option,
      });
    },
    onEscKeyRelease(event: any) {
      if (event.keyCode === 27) {
        this.hideContextMenu();
      }
    },
  },
  mounted() {
    document.body.addEventListener("keyup", this.onEscKeyRelease);
  },
  beforeUnmount() {
    document.removeEventListener("keyup", this.onEscKeyRelease);
  },
});
</script>

<style lang="css">
.vue-simple-context-menu {
  background-color: #ecf0f1;
  border-bottom-width: 0px;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 rgba(51, 51, 51, 0.2);
  display: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  left: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  z-index: 1000000;
}
.vue-simple-context-menu--active {
  display: block;
}
.vue-simple-context-menu__item {
  align-items: center;
  color: #333;
  cursor: pointer;
  display: flex;
  padding: 5px 15px;
}
.vue-simple-context-menu__item:hover {
  background-color: #007aff;
  color: #fff;
}
.vue-simple-context-menu__divider {
  background-clip: content-box;
  background-color: #c0cdd1;
  box-sizing: content-box;
  height: 2px;
  padding: 4px 0;
  pointer-events: none;
}
.vue-simple-context-menu li:first-of-type {
  margin-top: 4px;
}
.vue-simple-context-menu li:last-of-type {
  margin-bottom: 4px;
}
</style>

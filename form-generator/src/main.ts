import { createApp } from "vue";
import axios from "axios";
import SimpleTypeahead from "vue3-simple-typeahead";
import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css";
import Notifications from "@kyvg/vue3-notification";
import { Chart as ChartJS, registerables } from "chart.js";
import "chartjs-adapter-moment";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import AppConfig from "./constants/app";
import {
  Dropdown,
  DropdownItemButton,
  Modal,
  Collapse,
  Spinner,
} from "@/components";
import notificationsMixin from "@/mixins/notifications";

ChartJS.register(...registerables);

axios.defaults.baseURL = AppConfig.API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.response.use((response) => response.data);

const app = createApp(App)
  .use(store)
  .use(router)
  .use(SimpleTypeahead)
  .use(Notifications)
  .directive("clickout", {
    beforeMount(el: any, binding: any, vnode: any) {
      el.clickOutsideEvent = function (event) {
        if (!(el === event.target || el.contains(event.target))) {
          if (binding.value) {
            binding.value(event, el);
          }
        }
      };
      document.body.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted(el) {
      document.body.removeEventListener("click", el.clickOutsideEvent);
    },
  })
  .component("modal", Modal)
  .component("dropdown", Dropdown)
  .component("dropdown-item-button", DropdownItemButton)
  .component("collapse", Collapse)
  .component("spinner", Spinner)
  .mount("#app");

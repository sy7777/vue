import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from "./utils/day";
import Modal from "vue-bs-modal";

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

createApp(App).use(store).use(router).use(dayjs).use(Modal).component('Datepicker', Datepicker).mount('#app');
 
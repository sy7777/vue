import dayjs from "dayjs";
import "dayjs/locale/en-au";
dayjs.locale("en-au");
import { App} from "vue";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    readonly $dayjs: (date?: dayjs.ConfigType) => dayjs.Dayjs;
  }
}
// Vue.filter('filterTime', value=>{
//     return dayjs().to(value)
// })
export default {
  install: (app: App<Element>): void => {
    app.config.globalProperties.$dayjs = dayjs;
  },
};

import { MSALBasic } from "vue-msal/lib/src/types";

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "vue/types/vue" {
  interface Vue {
    $msal: MSALBasic;
  }
}

declare module "raw-loader!*" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  export default Vue;
}

declare module "*.graphql" {
  import { DocumentNode } from "graphql";

  const Schema: DocumentNode;

  export = Schema;
}

declare module "vue-js-modal";
declare module "vue-js-modal/dist/ssr.index";
declare module "vue-notification/dist/ssr";

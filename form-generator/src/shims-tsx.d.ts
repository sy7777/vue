import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }

  interface Window {
    gapi: any;
    fbAsyncInit: any;
    FB: any;
    turf: any;
  }
}

declare module "*.svg" {
  // It's really a string, precisely a resolved path pointing to the image file
  const filePath: string;

  export default filePath;
}

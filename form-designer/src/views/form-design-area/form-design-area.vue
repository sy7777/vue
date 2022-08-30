<template>
  <div class="design-container" :style="getContainerStyle()">
    <div class="border-bottom d-flex align-items-center" v-if="!preview">
      <i class="bi bi-eye" @click="previewForm"></i>
      <i class="bi bi-clipboard-check"></i>
    </div>
    <!-- <transition name="list"> -->
    <div
      class="empty-state d-flex justify-content-center align-items-center"
      v-if="!schema.controls.length && !preview"  
    >
      <EmptyState :emptyMsg="emptyMsg" />
    </div>
    <!-- </transition> -->
    <div v-if="preview">
      <div class="modal-header"><h5 class="modal-title">Preview</h5></div>
      <div class="modal-body">
        <div v-for="form in schema.controls" :key="form.id">
          <component
            :is="form.type"
            :schema="form"
            v-model="formValues[form.name]"
          ></component>
        </div>
      </div>
    </div>
    <div v-else>
      <VueDraggableNext
        v-model="schema.controls"
        ghost-class="ghost"
        handle=".drag-handle"
        @change="reorder"
      >
        <transition-group name="list" v-if="schema?.controls?.length">
          <div v-for="form in schema.controls" :key="form.id">
            <FormDesignWrapper
              @onDelSchema="delSchema(form.id)"
              @onEditSchema="editSchema(form.id)"
              ><component :is="form.type" :schema="form"></component
            ></FormDesignWrapper>
          </div>
        </transition-group>
      </VueDraggableNext>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-primary"
        @click="showFormInfo()"
        v-if="preview"
      >
        Show
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  FormDesignCheckbox,
  FormDesignInput,
  FormDesignRadio,
  FormDesignTextarea,
  FormDesignNumber,
  FormDesignWrapper,
  FormDesignTable,
  FormDesignText,
} from "@/components";
import { FormControlJsonSchema, FormJsonSchema } from "@/models";
import { VueDraggableNext } from "vue-draggable-next";
import { CSSProperties, defineComponent, PropType, StyleValue } from "vue";
import { EmptyState } from "@/components/empty-state";
interface IData {
  formValues: Record<string, any>;
  schema: FormJsonSchema;
  emptyMsg: string;
}
export default defineComponent({
  name: "FormDesignArea",
  components: {
    FormDesignInput,
    FormDesignRadio,
    FormDesignCheckbox,
    FormDesignTextarea,
    FormDesignWrapper,
    FormDesignNumber,
    FormDesignTable,
    FormDesignText,
    VueDraggableNext,
    EmptyState,
  },
  data(): IData {
    return {
      formValues: {},
      schema: { controls: [], category: "" },
      emptyMsg: "Please add the form controls",
    };
  },
  props: {
    jsonForms: { type: Object as PropType<FormJsonSchema> },
    preview: { type: Boolean as PropType<boolean>, default: false },
  },
  created() {
    console.log(this.jsonForms);
  },
  methods: {
    delSchema(id: string) {
      this.$emit("onDelSchema", id);
    },
    editSchema(id: string) {
      this.$emit("onEditSchema", id);
    },
    showFormInfo() {
      console.log(this.formValues);
    },
    reorder() {
      this.$emit("onReorder", [...this.schema?.controls]);
    },
    previewForm() {
      this.$emit("onPreview");
    },
    getContainerStyle(){
      return{
        "overflow-y": this.schema?.controls?.length ?  "auto" : "hidden"
      } as StyleValue
    }
  },
  watch: {
    jsonForms: {
      handler: function (newVal: FormJsonSchema) {
        this.schema = { ...newVal, controls: [...newVal.controls] };
      },
      immediate: true,
      deep: true,
    },
  },
});
</script>

<style scoped>
.design-container {
  background-color: #f3f5f9;
  text-align: left;
  height: 100%;
  /* overflow-y: auto; */
  overflow-x: hidden;
}
/* width */
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 7px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #25623f;
  border-radius: 7px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #25623f;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-move, /* apply transition to moving elements */
.list-enter-active{
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
i {
  cursor: pointer;
  margin: 0 7px 0 7px;
}
.empty-state {
  height: 90%;
}
</style>

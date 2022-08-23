<template>
  <div class="form-container">

    <!-- <div class="d-flex justify-content-center align-items-center p-2">
      <span>Form Design / </span> &nbsp;
      <span @click="previewForm" class="form-btn d-flex align-items-center justify-content-center"> Preview the form</span>
      <span @click="saveForm" class="form-btn d-flex align-items-center justify-content-center"> Save the form</span>
    </div> -->


    <div class="d-flex justify-content-between row form-detail-box">
      <FormDesignFields @onAddItem="addToFormJson($event)" class="col" />
      <FormDesignArea
        class="col-6"
        :jsonForms="formJson"
        @onDelSchema="deleteSchema($event)"
        @onEditSchema="onSelectSchema($event)"
        @onReorder="reorderSchema($event)"
        @onPreview="previewForm"
      />
      <FormDesignCustomise
        :schema="selectedSchema"
        @onUpdateControlDetail="updateControls($event)"
        class="col-4"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { FormControlJsonSchema, FormJsonSchema } from "@/models";
import { defineComponent } from "vue";
import { ModalSize } from "vue-bs-modal";
import { FormDesignArea } from "../form-design-area";
import { FormDesignCustomise } from "../form-design-customise";
import { FormDesignFields } from "../form-design-fields";
interface IData {
  formJson: FormJsonSchema;
  selectedSchema: FormControlJsonSchema | undefined;
}

export default defineComponent({
  name: "FormDesign",
  components: {
    FormDesignArea,
    FormDesignFields,
    FormDesignCustomise,
  },
  data(): IData {
    return {
      formJson: { controls: [], category: "" },
      selectedSchema: undefined,
    };
  },
  methods: {
    addToFormJson(schema: FormControlJsonSchema) {
      // console.log(type, "in form design page");
      this.formJson.controls.push(schema);
      // console.log(this.formJson);
    },
    deleteSchema(id: string) {
      this.formJson.controls = this.formJson.controls.filter(
        (schema) => schema.id !== id
      );
      this.checkSelectedSchema();
    },
    onSelectSchema(id: string) {
      // console.log(id);
      this.selectedSchema = this.formJson.controls.find(
        (schema) => schema.id === id
      );
      // console.log(this.selectedSchema);
    },
    previewForm() {
      this.$vbsModal.open({
        content: FormDesignArea,
        contentProps: { jsonForms: this.formJson, preview: true },
        size: ModalSize.LARGE,
      });
    },
    reorderSchema(schemas: FormControlJsonSchema[]) {
      this.formJson.controls = schemas;
    },
    checkSelectedSchema() {
      if (!this.selectedSchema) {
        return;
      }
      const existing = this.formJson.controls.find(
        (form) => form.id === this.selectedSchema?.id
      );
      if (!existing) {
        this.selectedSchema = undefined;
      }
    },
    updateControls(schema: FormControlJsonSchema) {
      this.formJson.controls.forEach((val) => {
        if (val.id === schema.id) {
          val.name = schema.name;
          val.options = schema.options;
          val.placeholder = schema.placeholder;
          val.required = schema.required;
          val.title = schema.title;
        }
      });
    },
    saveForm(){
      console.log(this.formJson);     
    }
  },
});
</script>

<style scoped>
.form-container {
  width: 100%;
  /* min-width: 1250px; */
  height: calc(100% - 64px);
  /* border: 7px dashed #25623f; */
}
.form-detail-box {
  width: 100%;
  height: calc(100% - 64px);
}
.form-btn {
  background-color: #25623f;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  height: 32px;
  overflow: hidden;
  position: relative;
  text-align: left;
  text-overflow: ellipsis;
  transition: border-color 0.3s ease;
  white-space: nowrap;
  width: 130px;
  text-align: center;
}
</style>

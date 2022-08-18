<template>
  <div class="form-container">
    <!-- <nav aria-label="breadcrumb"> -->
      <ol class="breadcrumb d-flex justify-content-center">
        <li class="breadcrumb-item active">Form Design</li>
        <li class="breadcrumb-item">
          <button @click="previewForm">Preview the form</button>
        </li>
      </ol>
    <!-- </nav> -->

    <div class="d-flex justify-content-between row form-detail-box">
      <FormDesignFields @onAddItem="addToFormJson($event)" class="col"/>
      <FormDesignArea
      class="col-6"
        :jsonForms="formJson"
        @onDelSchema="deleteSchema($event)"
        @onEditSchema="onSelectSchema($event)"
      />
      <FormDesignCustomise :schema="selectedSchema"   class="col"/>
    </div>
  </div>
</template>

<script lang="ts">
import { FormJsonSchema } from "@/models";
import { defineComponent } from "vue";
import { ModalSize } from "vue-bs-modal";
import { FormDesignArea } from "../form-design-area";
import { FormDesignCustomise } from "../form-design-customise";
import { FormDesignFields } from "../form-design-fields";
interface IData {
  formJson: FormJsonSchema[];
  selectedSchema: FormJsonSchema | undefined;
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
      formJson: [],
      selectedSchema: undefined,
    };
  },
  methods: {
    addToFormJson(schema: FormJsonSchema) {
      // console.log(type, "in form design page");
      this.formJson.push(schema);
      console.log(this.formJson);
    },
    deleteSchema(id: string) {
      this.formJson = this.formJson.filter((schema) => schema.id !== id);
    },
    onSelectSchema(id: string) {
      console.log(id);
      this.selectedSchema = this.formJson.find((schema) => schema.id === id);
      console.log(this.selectedSchema);
    },
    previewForm() {
      this.$vbsModal.open({
        content: FormDesignArea,
        contentProps: { jsonForms: this.formJson, preview: true },
        size: ModalSize.LARGE,
      });
    },
  },
});
</script>

<style scoped>
.form-container {
  width: 100%;
  min-width: 1248px;
  height: calc(100% - 64px);
  border: 7px dashed #25623f;
}
.form-detail-box{
  width: 100%;
  height: calc(100% - 64px);
}
</style>


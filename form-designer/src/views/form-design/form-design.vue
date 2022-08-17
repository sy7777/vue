<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb d-flex justify-content-center">
      <li class="breadcrumb-item active"><a href="#">Form Design</a></li>
      <li class="breadcrumb-item"><a href="#">Preview the form</a></li>
    </ol>
  </nav>
  <div class="row form-container">
    <FormDesignFields @onAddItem="addToFormJson($event)" />
    <FormDesignArea :jsonForms="formJson" @onDelSchema="deleteSchema($event)" @onEditSchema="onSelectSchema($event)"/>
    <FormDesignCustomise :schema = "selectedSchema"/>
  </div>
</template>

<style scoped>
.form-container {
  width: 100%;
  min-width: 1026px;
  height: 80%;
}
</style>

<script lang="ts">
import { FormJsonSchema } from "@/models";
import { defineComponent } from "vue";
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
    onSelectSchema(id:string){
      console.log(id);
      this.selectedSchema = this.formJson.find(schema => schema.id === id);
      console.log(this.selectedSchema );
    }
  },
});
</script>

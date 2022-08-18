<template>
  <div class="design-container" :class="{ 'modal-body': preview }">
    <div class="text-center" v-if="!preview">Design your form</div>
    <div v-for="form in jsonForms" :key="form.id">
      <div v-if="preview">
        <component
          :is="form.type"
          :schema="form"
          v-model="formValues[form.name]"
        ></component>
      </div>
      <div v-else>
        <FormDesignWrapper
          @onDelSchema="delSchema(form.id)"
          @onEditSchema="editSchema(form.id)"
          ><component :is="form.type" :schema="form"></component
        ></FormDesignWrapper>
      </div>
    </div>
    <button @click="showFormInfo()" v-if="preview">Show</button>
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
} from "@/components";
import { FormJsonSchema } from "@/models";
import { defineComponent, PropType } from "vue";
interface IData {
  formValues: Record<string, any>;
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
    FormDesignTable
  },
  data(): IData {
    return {
      formValues: {},
    };
  },
  props: {
    jsonForms: { type: Array as PropType<FormJsonSchema[]> },
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
  },
});
</script>

<style scoped>
.design-container {
  background-color: #f3f5f9;
  text-align: left;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
/* width */
::-webkit-scrollbar {
  width: 20px;
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
</style>

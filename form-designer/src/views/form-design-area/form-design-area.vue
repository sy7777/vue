<template>
  <div class="col-7 design-container">
    Design your form
    <div v-for="form in jsonForms" :key="form.id">
      <div v-if="preview"><component :is="form.type"></component></div>
      <div v-else>
        <FormDesignWrapper @onDelSchema="delSchema(form.id)" @onEditSchema="editSchema(form.id)"
          ><component :is="form.type"></component
        ></FormDesignWrapper>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {
  FormDesignCheckbox,
  FormDesignInput,
  FormDesignRadio,
  FormDesignTextarea,
  FormDesignWrapper,
} from "@/components";
import { FormJsonSchema } from "@/models";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "FormDesignArea",
  components: {
    FormDesignInput,
    FormDesignRadio,
    FormDesignCheckbox,
    FormDesignTextarea,
    FormDesignWrapper,
  },
  props: {
    jsonForms: { type: Array as PropType<FormJsonSchema[]> },
    preview: { type: Boolean as PropType<boolean>, default: false },
  },
  created() {
    console.log(this.jsonForms);
  },
  methods:{
    delSchema(id:string){
      this.$emit("onDelSchema",id)
    },
    editSchema(id:string){
      this.$emit("onEditSchema", id)
    }
  }
});
</script>

<style scoped>
.col {
  border: 1px solid #000;
}
.design-container {
  background-color: #f3f5f9;
  /* min-width: 722px; */
  height: 100%;
}
</style>

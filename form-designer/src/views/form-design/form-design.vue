<template>
 <nav aria-label="breadcrumb">
  <ol class="breadcrumb d-flex justify-content-center">
    <li class="breadcrumb-item active"><a href="#">Form Design</a></li>
    <li class="breadcrumb-item"><a href="#">Preview the form</a></li>
  </ol>
</nav>
 <div class="row form-container">
    <FormDesignFields/>
    <FormDesignArea/>
    <FormDesignCustomise/>
  </div>
</template>

<style scoped>
.col{
  border: 1px solid #000;
}
.form-container{
  width: 100%;
  min-width: 1026px;
  height: 80%;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { FormDesignArea } from "../form-design-area";
import { FormDesignCustomise } from "../form-design-customise";
import { FormDesignFields } from "../form-design-fields";
export interface FormJsonSchema{
  type: string;
  name: string;
  title: string;
  options: FormOptionSchema[];
  required: boolean;
}
interface FormOptionSchema{
  value:string;
}
export default defineComponent({
  name: "FormDesign",
  components:{
    FormDesignArea,
    FormDesignFields,
    FormDesignCustomise,
  },
  data(){
    return {
      formJson: [],
    }
  }
});
</script>

<template>
  <div class="design-container" :class="{ 'modal-body': preview }">
    <div class="text-center p-2" v-if="!preview">Design your form</div>
    <div v-if="preview">
      <div v-for="form in schema.controls" :key="form.id">
        <component
          :is="form.type"
          :schema="form"
          v-model="formValues[form.name]"
        ></component>
      </div>
    </div>
    <div v-else>
      <VueDraggableNext v-model="schema.controls"  ghost-class="ghost" handle=".drag-handle" @change="reorder">
        <transition-group name="list" >
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
  FormDesignText,
} from "@/components";
import { FormControlJsonSchema, FormJsonSchema } from "@/models";
import { VueDraggableNext } from "vue-draggable-next";
import { defineComponent, PropType } from "vue";
interface IData {
  formValues: Record<string, any>;
  schema: FormJsonSchema;
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
  },
  data(): IData {
    return {
      formValues: {},
      schema: { controls: [], category: "" },
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
    reorder(){
      this.$emit("onReorder", [...this.schema?.controls])
    },
  },
  watch:{
    jsonForms:{
      handler:function(newVal:FormJsonSchema){
        this.schema = {...newVal, controls: [...newVal.controls]}
      },
      immediate: true,
      deep:true,
    }
  }
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

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from{
  opacity: 0;
  transform: translateX(30px);
}

/* .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
} */

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
/* .list-leave-active {
  position: absolute;
} */
</style>

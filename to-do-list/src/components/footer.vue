<template>
  <div>Already done {{doneList.length}} / {{ itemList.length }} tasks.</div>
</template>

<script lang="ts">
import { IItem } from "@/models";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "MyFooter",
  data(){
    return {
      doneList: [],
    }
  },
  created(){
    console.log(this.doneList);
    
  },
  computed: {
    ...mapGetters(["itemList","doneList"]),
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

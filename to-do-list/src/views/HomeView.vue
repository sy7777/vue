<template>
  <section class="vh-80">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div
            class="card"
            id="list1"
            style="border-radius: 0.75rem; background-color: #eff1f2"
          >
            <div class="card-body py-4 px-4 px-md-5">
              <p class="h1 text-center mt-3 mb-4 pb-3 text-primary">
                <i class="fas fa-check-square me-1"></i>
                <u>My Todo-s</u>
              </p>
              <MyHeader @onAddItem="onAddItemToVuex($event)"></MyHeader>
              <MyList
                :items="itemList"
                @onTickItem="checkTodo($event)"
                @onDeleteItem="onRemoveItem($event)"
                @updateItem="onUpdateItem($event)"
                @addFilter="addFilter($event)"
                @removeFilter="removeFilter($event)"
              ></MyList>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import MyHeader from "@/components/header.vue"; // @ is an alias to /src
import MyList from "@/components/list.vue"; // @ is an alias to /src
import { mapGetters, mapMutations } from "vuex";
import { IItem } from "../models";

export default defineComponent({
  name: "HomeView",
  components: {
    MyHeader,
    MyList,
  },
  computed: {
    ...mapGetters(["itemList"]),
  },
  methods: {
    ...mapMutations(["addItem", "setItemTicked", "delteItem","updateItemInVuex", "addFilter", "removeFilter",]),
    onAddItemToVuex(itemDetail: IItem) {
      this.addItem(itemDetail);
    },
    checkTodo(id: string) {
      this.setItemTicked(id);
    },
    onRemoveItem(id: string) {
      //  console.log(id);
      this.delteItem(id);
    },
    onUpdateItem(itemObj: IItem){
      this.updateItemInVuex(itemObj)
    },
  },
});
</script>

<style>
#list1 .form-control {
  border-color: transparent;
}
#list1 .form-control:focus {
  border-color: transparent;
  box-shadow: none;
}
#list1 .select-input.form-control[readonly]:not([disabled]) {
  background-color: #fbfbfb;
}
</style>

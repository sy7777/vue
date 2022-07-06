<template>
  <div class="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
    <p class="small mb-0 me-2 text-muted">Filter</p>
    <select
      class="select"
      @change="
        applyFilter(
          filterType.FINISH_STATUS,
          ($event.target as HTMLSelectElement).value
        )
      "
    >
      <option :value="removeValue">All</option>
      <option :value="true">Completed</option>
      <option :value="false">Active</option>
    </select>
    <p class="small mb-0 ms-4 me-2 text-muted">Sort</p>
    <select class="select">
      <option value="1">Added date</option>
      <option value="2">Due date</option>
    </select>
    <a
      href="#!"
      style="color: #23af89"
      data-mdb-toggle="tooltip"
      title="Ascending"
      ><i class="fas fa-sort-amount-down-alt ms-2"></i
    ></a>
  </div>
  <MyItem
    v-for="item in items"
    :key="item.id"
    :item="item"
    @checkTodo="oncheckTodo($event)"
    @removeItem="del($event)"
    @editItem="edit($event)"
  ></MyItem>
</template>

<script lang="ts">
import { FilterType } from "@/store";
import { defineComponent, PropType } from "vue";
import { IItem } from "../models";
import MyItem from "./item.vue";

export default defineComponent({
  name: "MyList",
  data() {
    return {
      filterType: FilterType,
      removeValue: "remove"
    };
  },
  components: {
    MyItem,
  },
  props: {
    items: { type: Array as PropType<IItem[]> },
  },
  methods: {
    oncheckTodo(id: string) {
      this.$emit("onTickItem", id);
    },
    del(id: string) {
      this.$emit("onDeleteItem", id);
    },
    edit(itemObj: IItem) {
      this.$emit("updateItem", itemObj);
    },
    applyFilter(filterType: FilterType, value: any) {
      if (value === this.removeValue) {
        this.$emit("removeFilter", filterType);
      } else {
        this.$emit("addFilter", { name: filterType, value });
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

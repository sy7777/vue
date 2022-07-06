<template>
  <ul class="list-group list-group-horizontal rounded-0 bg-transparent">
    <li
      class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent"
    >
      <div class="form-check">
        <input
          class="form-check-input me-0"
          type="checkbox"
          :value="true"
          id="flexCheckChecked1"
          aria-label="..."
          :checked="item.isTicked"
          @change="handleCheck(item.id)"
        />
      </div>
    </li>
    <!--   :value="setItemTicked(item.isTicked)"-->
    <li
      class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent"
    >
      <p class="lead fw-normal mb-0">{{ item.name }}</p>
    </li>
    <li
      class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent"
    >
      <div class="d-flex flex-row justify-content-end mb-1">
        <a
          href="#!"
          class="text-info"
          data-mdb-toggle="tooltip"
          title="Edit todo"
          @click="openProfileModal(item)"
          ><i class="fas fa-pencil-alt me-3"></i
        ></a>
        <a
          href="#!"
          class="text-danger"
          data-mdb-toggle="tooltip"
          title="Delete todo"
          @click="deleteItem(item.id)"
          ><i class="fas fa-trash-alt"></i
        ></a>
      </div>
      <div class="text-end text-muted">
        <a
          href="#!"
          class="text-muted"
          data-mdb-toggle="tooltip"
          title="Created date"
        >
          <p class="small mb-0">
            <i class="fas fa-info-circle me-2"></i
            >{{ formateDate(item.createdTime) }}
            <!-- <i class="fas fa-info-circle me-2"></i>{{ formateDate(item.dueDate) }} -->
          </p>
        </a>
        <a
          href="#!"
          class="text-muted"
          data-mdb-toggle="tooltip"
          title="Due date"
        >
          <p class="small mb-0">
            <i class="fas fa-info-circle me-2"></i
            >{{ formateDate(item.dueDate) }}
          </p>
        </a>
      </div>
    </li>
  </ul>
  <hr />
  <!-- <ItemEditModal v-if="editModalVisible" ></ItemEditModal> -->
  <!-- <ul class="list-group list-group-horizontal rounded-0">
    <li
      class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent"
    >
      <div class="form-check">
        <input
          class="form-check-input me-0"
          type="checkbox"
          value=""
          id="flexCheckChecked2"
          aria-label="..."
        />
      </div>
    </li>
    <li
      class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent"
    >
      <p class="lead fw-normal mb-0">Renew car insurance</p>
    </li>
    <li
      class="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent"
    >
      <div
        class="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light"
      >
        <p class="small mb-0">
          <a href="#!" data-mdb-toggle="tooltip" title="Due on date">
            <i class="fas fa-hourglass-half me-2 text-warning"></i>
          </a>
          28th Jun 2020
        </p>
      </div>
    </li>
    <li
      class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent"
    >
      <div class="d-flex flex-row justify-content-end mb-1">
        <a
          href="#!"
          class="text-info"
          data-mdb-toggle="tooltip"
          title="Edit todo"
          ><i class="fas fa-pencil-alt me-3"></i
        ></a>
        <a
          href="#!"
          class="text-danger"
          data-mdb-toggle="tooltip"
          title="Delete todo"
          ><i class="fas fa-trash-alt"></i
        ></a>
      </div>
      <div class="text-end text-muted">
        <a
          href="#!"
          class="text-muted"
          data-mdb-toggle="tooltip"
          title="Created date"
        >
          <p class="small mb-0">
            <i class="fas fa-info-circle me-2"></i>28th Jun 2020
          </p>
        </a>
      </div>
    </li>
  </ul>
  <ul class="list-group list-group-horizontal rounded-0 mb-2">
    <li
      class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent"
    >
      <div class="form-check">
        <input
          class="form-check-input me-0"
          type="checkbox"
          value=""
          id="flexCheckChecked3"
          aria-label="..."
        />
      </div>
    </li>
    <li
      class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent"
    >
      <p class="lead fw-normal mb-0 bg-light w-100 ms-n2 ps-2 py-1 rounded">
        Sign up for online course
      </p>
    </li>
    <li
      class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent"
    >
      <div class="d-flex flex-row justify-content-end mb-1">
        <a
          href="#!"
          class="text-danger"
          data-mdb-toggle="tooltip"
          title="Delete todo"
          ><i class="fas fa-trash-alt"></i
        ></a>
      </div>
      <div class="text-end text-muted">
        <a
          href="#!"
          class="text-muted"
          data-mdb-toggle="tooltip"
          title="Created date"
        >
          <p class="small mb-0">
            <i class="fas fa-info-circle me-2"></i>28th Jun 2020
          </p>
        </a>
      </div>
    </li>
  </ul> -->
</template>

<script lang="ts">
import { IItem } from "@/models";
import { defineComponent, PropType } from "vue";
import { ModalSize } from "vue-bs-modal";
import ItemEditModal from "./item-edit-modal.vue";

export default defineComponent({
  name: "MyItem",
  data() {
    return {
      // editModalVisible: false,
    };
  },
  methods: {
    // ...mapMutations(["setItemTicked"]),
    handleCheck(id: string) {
      console.log(id);
      this.$emit("checkTodo", id);
    },
    deleteItem(id: string) {
      this.$emit("removeItem", id);
    },
    editItem(itemObj: IItem) {
      this.$emit("editItem", itemObj);
      this.$vbsModal.close();
    },
    openProfileModal(item: IItem) {
      this.$vbsModal.open({
        // pass your component as the whole modal content
        // you can also use the component's registered name
        content: ItemEditModal,
        size: ModalSize.LARGE,
        // pass custom data as props to the EditProfileComponent.
        contentProps: {
          singleItem: item,
          onEdit: this.editItem,
        },
        // center: true, // default is false
        backgroundScrolling: true, // default is false
      });
    },
    formateDate(date: Date) {
      return this.$dayjs(date).format("DD/MM/YYYY HH:mm:ss");
    },
  },
  props: {
    item: { type: Object as PropType<IItem>, required: true },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

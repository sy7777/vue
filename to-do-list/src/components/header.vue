<template>
  <div class="pb-2">
    <div class="card">
      <div class="card-body">
        <div class="d-flex flex-row align-items-center">
          <input
            type="text"
            class="form-control form-control-lg"
            id="exampleFormControlInput1"
            placeholder="Add new..."
            v-model="itemName"
            @keyup.enter="addItem"
          />
          <Datepicker
                v-model="dueDate"
                position="left"
                :time-picker-component="timePicker"
                class="datepicker"
              />
          <!-- <a href="#!" data-mdb-toggle="tooltip" title="Set due date"
            ><i class="fas fa-calendar-alt fa-lg me-3">
               </i
          ></a> -->
          <div>
            <button type="button" class="btn btn-primary" @click="addItem">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <hr class="my-4" />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
// import { mapGetters, mapMutations, mapState } from "vuex";

// import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
const TimePicker = defineAsyncComponent(() => import("./time-picker.vue"));
export default defineComponent({
  name: "MyHeader",
  data() {
    return {
      itemName: undefined,
      dueDate: new Date(),
      timePicker: TimePicker,
    };
  },

  methods: {
    // ...mapMutations(["addItem"]),
    getCurrentTime() {
      // const date = new Date();
      // const year = date.getFullYear();
      // let month = date.getMonth() + 1;
      // let day = date.getDate();
      // month = month < 10 ? parseInt("0" + month) : month;
      // day = day < 10 ? parseInt("0" + day) : day;
      // return `${day}/${month}/${year} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
    addItem() {
      if (this.itemName) {
        const itemDetail = {
          id: uuidv4(),
          name: this.itemName,
          isTicked: false,
          isEdit: false,
          isDel: false,
          createdTime: this.$dayjs().toDate(),
          dueDate: this.dueDate,
        };
        console.log(itemDetail);
        // this.addItem(itemDetail);
        this.$emit("onAddItem", itemDetail);
        this.itemName = undefined;
      } else {
        const confirmed = this.$vbsModal.confirm({
          title: "Warn",
          message: "Please add something",
        });
        return confirmed;
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.datepicker{
  width:30%;
  margin-right: 2rem;
}
</style>

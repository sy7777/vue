<template lang="html">
  <modal :visible="visible" :toggle="toggle" title="Edit Organisation Member">
    <div class="modal-body">
      <div class="form-group row">
        <label class="col-sm-3 col-form-label"> Role </label>
        <div class="col-sm-9">
          <dropdown v-bind:text="roleDropdownText" variant="primary">
            <dropdown-item-button
              v-for="r in roles"
              v-on:click="role = r"
              :key="r.id"
            >
              {{ r.displayName }}
            </dropdown-item-button>
          </dropdown>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-light mr-3" v-on:click="toggle()">
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-success"
        v-on:click="handleClickSubmit"
      >
        Submit
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IOrganisationMember, IRole } from "@/models";

interface IData {
  role: IRole | undefined;
}

export default defineComponent({
  computed: {
    roleDropdownText: function (): string {
      return this.role ? this.role.displayName : "Select a role";
    },
  },
  data: function (): IData {
    return {
      role: undefined,
    };
  },
  methods: {
    handleClickSubmit: function (): void {
      this.onSubmit({
        ...this.member,
        role: this.role as IRole,
      });
    },
  },
  props: {
    visible: Boolean,
    toggle: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onSubmit: {
      type: Function as PropType<(member: IOrganisationMember) => void>,
      required: true,
    },
    member: {
      type: Object as PropType<IOrganisationMember>,
      required: true,
    },
    roles: {
      type: Array as PropType<IRole[]>,
      required: true,
    },
  },
  watch: {
    member: {
      handler: function (): void {
        this.role = this.member.role;
      },
      immediate: true,
      deep: true,
    },
  },
});
</script>

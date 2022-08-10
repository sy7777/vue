<template lang="html">
  <modal :visible="visible" :toggle="toggle" title="Send Invitation" size="lg">
    <div class="modal-body">
      <div class="form-group row">
        <label for="emailInput" class="col-sm-3 col-form-label"> Email </label>
        <div class="col-sm-9">
          <input
            id="emailInput"
            type="email"
            class="form-control"
            placeholder="e.g. test@axistech.co"
            v-model="invitationEmail"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label"> Role </label>
        <div class="col-sm-9">
          <dropdown v-bind:text="roleDropdownText" variant="primary">
            <dropdown-item-button
              v-for="role in roles"
              v-on:click="invitationRole = role"
              :key="role.id"
            >
              {{ role.displayName }}
            </dropdown-item-button>
          </dropdown>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-light mr-3" v-on:click="toggle">
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-primary"
        v-on:click="handleSubmit"
        :disabled="isInvalid"
      >
        Submit
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IRole } from "@/models";

interface IData {
  invitationRole: IRole | undefined;
  invitationEmail: string;
}

export default defineComponent({
  computed: {
    roleDropdownText: function (): string {
      return this.invitationRole
        ? this.invitationRole.displayName
        : "Select a role";
    },
    isInvalid: function (): boolean {
      return !this.invitationRole || !this.invitationEmail;
    },
  },
  data: function (): IData {
    return {
      invitationRole: undefined,
      invitationEmail: "",
    };
  },
  methods: {
    handleSubmit: function (): void {
      if (!this.isInvalid) {
        this.onSubmit({
          email: this.invitationEmail,
          role: this.invitationRole as IRole,
        });
      }
    },
  },
  props: {
    visible: Boolean,
    toggle: {
      type: Function as PropType<() => void>,
      required: true,
    },
    roles: {
      type: Array as PropType<IRole[]>,
      required: true,
    },
    onSubmit: {
      type: Function as PropType<
        (payload: { email: string; role: IRole }) => void
      >,
      required: true,
    },
  },
});
</script>

import axios from "axios";
import { ActionTree, GetterTree, MutationTree } from "vuex";

import { IRootState } from "../index";
import {
  IAPIResponse,
  APIResponseStatus,
  IOrg,
  IOrganisationMember,
  IOrganisationMembersDictionary,
  IOrganisationInvitationsDictionary,
  IRole,
  IInvitation,
} from "@/models";
import { GENERIC_ERROR_MESSAGE } from "@/constants";
import { handleServerError } from "@/services";

export interface IOrganisationMembersState {
  organisationMembersDictionary: IOrganisationMembersDictionary;
  isFetchingMembers: boolean;
  organisationInvitationsDictionary: IOrganisationInvitationsDictionary;
  isCreatingInvitation: boolean;
  isDeletingMember: boolean;
  isUpdatingMember: boolean;
}

const defaultState: IOrganisationMembersState = {
  organisationMembersDictionary: {},
  isFetchingMembers: false,
  organisationInvitationsDictionary: {},
  isCreatingInvitation: false,
  isDeletingMember: false,
  isUpdatingMember: false,
};

const getters: GetterTree<IOrganisationMembersState, IRootState> = {
  organisationMembers: (state) => (organisationId: number) => {
    return state.organisationMembersDictionary[organisationId];
  },
};

const actions: ActionTree<IOrganisationMembersState, IRootState> = {
  async updateMember(
    { commit },
    {
      organisation,
      member,
    }: {
      organisation: IOrg;
      member: IOrganisationMember;
    }
  ) {
    commit("updateMember");

    try {
      const response: IAPIResponse = await axios.put(
        `orgs/${organisation.id}/members/${member.user.id}`,
        member
      );

      if (response.status === APIResponseStatus.SUCCESS) {
        const updatedMember: IOrganisationMember = response.data.member;

        commit("updateMemberSuccess", {
          organisation,
          member: updatedMember,
        });

        return updatedMember;
      } else {
        throw new Error();
        return;
      }
    } catch (error) {
      commit("updateMemberError");
      handleServerError(error);
      return;
    }
  },
  async deleteMember(
    { commit },
    {
      organisation,
      member,
    }: {
      organisation: IOrg;
      member: IOrganisationMember;
    }
  ) {
    commit("deleteMember");

    try {
      const response: IAPIResponse = await axios.delete(
        `orgs/${organisation.id}/members/${member.user.id}`
      );

      if (response.status === APIResponseStatus.SUCCESS) {
        commit("deleteMemberSuccess", {
          organisation,
          member,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      commit("deleteMemberError");
      handleServerError(error);
    }
  },
  async createInvitation(
    { commit },
    {
      organisation,
      email,
      role,
    }: {
      organisation: IOrg;
      email: string;
      role: IRole;
    }
  ) {
    commit("createInvitation");

    try {
      const response: IAPIResponse = await axios.post(
        `orgs/${organisation.id}/invitations`,
        {
          email,
          role,
        }
      );

      if (response.status === APIResponseStatus.SUCCESS) {
        const invitation: IInvitation = response.data.invitation;

        commit("createInvitationSuccess", {
          organisation,
          invitation,
        });

        return invitation;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      commit("createInvitationError");

      const message: string =
        ((error.response || {}).data || {}).message || GENERIC_ERROR_MESSAGE;

      throw new Error(message);
    }
  },
  async getOrganisationMembersWithCache(
    { state, dispatch },
    {
      organisation,
    }: {
      organisation: IOrg;
    }
  ) {
    const maybeMembers: IOrganisationMember[] | undefined =
      state.organisationMembersDictionary[organisation.id];

    if (typeof maybeMembers === "undefined") {
      return dispatch("getOrganisationMembers", {
        organisation,
      });
    } else {
      return Promise.resolve(maybeMembers);
    }
  },
  async getOrganisationMembers({ commit }, { organisation }) {
    commit("getOrganisationMembers");

    try {
      const response: IAPIResponse = await axios.get(
        `orgs/${organisation.id}/members`
      );

      if (response.status == APIResponseStatus.SUCCESS) {
        const organisationMembers: IOrganisationMember[] =
          response.data.organisationMembers;

        commit("getOrganisationMembersSuccess", {
          organisation,
          organisationMembers,
        });

        return organisationMembers;
      } else {
        console.error(`Response from server: ${response.message}`);
        commit("getOrganisationMembersError");
        return undefined;
      }
    } catch (error) {
      console.error(error);
      commit("getOrganisationMembersError");

      return undefined;
    }
  },
};

const mutations: MutationTree<IOrganisationMembersState> = {
  getOrganisationMembers(state, _) {
    state.isFetchingMembers = true;
  },
  getOrganisationMembersError(state, _) {
    state.isFetchingMembers = false;
  },
  getOrganisationMembersSuccess(state, { organisation, organisationMembers }) {
    state.isFetchingMembers = false;
    state.organisationMembersDictionary = {
      ...state.organisationMembersDictionary,
      [organisation.id]: organisationMembers,
    };
  },
  createInvitation(state) {
    state.isCreatingInvitation = true;
  },
  createInvitationError(state) {
    state.isCreatingInvitation = false;
  },
  createInvitationSuccess(
    state,
    {
      organisation,
      invitation,
    }: {
      organisation: IOrg;
      invitation: IInvitation;
    }
  ) {
    state.isCreatingInvitation = false;
    state.organisationInvitationsDictionary = {
      ...state.organisationInvitationsDictionary,
      [organisation.id]: (
        state.organisationInvitationsDictionary[organisation.id] || []
      ).concat(invitation),
    };
  },
  deleteMember(state) {
    state.isDeletingMember = true;
  },
  deleteMemberError(state) {
    state.isDeletingMember = false;
  },
  deleteMemberSuccess(
    state,
    {
      organisation,
      member,
    }: {
      organisation: IOrg;
      member: IOrganisationMember;
    }
  ) {
    state.isDeletingMember = false;
    state.organisationMembersDictionary = {
      ...state.organisationMembersDictionary,
      [organisation.id]: (
        state.organisationMembersDictionary[organisation.id] || []
      ).filter((item: IOrganisationMember) => item.user.id !== member.user.id),
    };
  },
  updateMember(state) {
    state.isUpdatingMember = true;
  },
  updateMemberError(state) {
    state.isUpdatingMember = false;
  },
  updateMemberSuccess(
    state,
    {
      organisation,
      member,
    }: {
      organisation: IOrg;
      member: IOrganisationMember;
    }
  ) {
    state.isUpdatingMember = false;
    state.organisationMembersDictionary = {
      ...state.organisationMembersDictionary,
      [organisation.id]: (
        state.organisationMembersDictionary[organisation.id] || []
      ).map((item: IOrganisationMember) =>
        item.user.id === member.user.id ? member : item
      ),
    };
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};

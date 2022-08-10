import axios from "axios";
import { ActionTree, GetterTree, MutationTree } from "vuex";

import { IRootState } from "../index";
import { IAPIResponse, APIResponseStatus, IRole } from "@/models";
import { GENERIC_ERROR_MESSAGE } from "@/constants";

export interface IRolesState {
  roles: IRole[] | undefined;
  isFetchingRoles: boolean;
}

const defaultState: IRolesState = {
  roles: undefined,
  isFetchingRoles: false,
};

const getters: GetterTree<IRolesState, IRootState> = {
  roles: (state) => () => state.roles || [],
};

const actions: ActionTree<IRolesState, IRootState> = {
  async getRolesWithCache({ state, dispatch }) {
    const maybeRoles: IRole[] | undefined = state.roles;

    if (typeof maybeRoles === "undefined") {
      return dispatch("getRoles");
    } else {
      return Promise.resolve(maybeRoles as IRole[]);
    }
  },
  async getRoles({ commit }) {
    commit("getRoles");

    try {
      const response: IAPIResponse = await axios.get("roles");

      if (response.status === APIResponseStatus.SUCCESS) {
        const roles: IRole[] = response.data.roles;

        commit("getRolesSuccess", {
          roles,
        });

        return roles;
      } else {
        console.error(`Response from server: ${response.message}`);
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      commit("getRolesError");

      const message: string =
        ((error.response || {}).data || {}).message || GENERIC_ERROR_MESSAGE;

      throw new Error(message);
    }
  },
};

const mutations: MutationTree<IRolesState> = {
  getRoles(state) {
    state.isFetchingRoles = true;
  },
  getRolesError(state) {
    state.isFetchingRoles = false;
  },
  getRolesSuccess(
    state,
    {
      roles,
    }: {
      roles: IRole[];
    }
  ) {
    state.isFetchingRoles = false;
    state.roles = roles;
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};

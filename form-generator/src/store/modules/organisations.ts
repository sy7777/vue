import { ActionTree, GetterTree, MutationTree } from "vuex";
import axios from "axios";

import { IRootState } from "../index";
import { IOrg, IAPIResponse, APIResponseStatus } from "@/models";

export interface IOrgsState {
  organisations: IOrg[] | undefined;
  isFetchingOrganisations: boolean;
  isCreatingOrganisation: boolean;
}

const defaultState: IOrgsState = {
  organisations: undefined,
  isFetchingOrganisations: false,
  isCreatingOrganisation: false,
};

const getters: GetterTree<IOrgsState, IRootState> = {
  getOrganisations: (state) => () => {
    return state.organisations;
  },
};

const actions: ActionTree<IOrgsState, IRootState> = {
  async getOrganisationsWithCache({ state, dispatch }) {
    const maybeOrganisations: IOrg[] | undefined = state.organisations;

    if (typeof maybeOrganisations === "undefined") {
      return dispatch("getOrganisations");
    } else {
      return Promise.resolve(maybeOrganisations);
    }
  },
  async getOrganisations({ commit }, _) {
    commit("getOrganisations");

    try {
      const endpoint = "/orgs";
      const response: IOrg[] = await axios.get(endpoint);

      commit("getOrganisationsSuccess", {
        organisations: response,
      });

      return response;
    } catch (error) {
      console.error(error);
      commit("getOrganisationsError");
      return undefined;
    }
  },
  async createOrganisation({ commit }, orgData) {
    commit("createOrganisation");

    try {
      const response: IAPIResponse = await axios.post("orgs", orgData);

      if (response.status === APIResponseStatus.SUCCESS) {
        const organisation: IOrg = response.data.organisation;

        commit("createOrganisationSuccess", organisation);

        return organisation;
      } else {
        console.error(`Response from server: ${response.message}`);
        commit("createOrganisationError");
      }
    } catch (error) {
      console.error(error);
      commit("createOrganisationError");
    }
  },
};

const mutations: MutationTree<IOrgsState> = {
  getOrganisations(state, _) {
    state.isFetchingOrganisations = true;
  },
  getOrganisationsError(state, _) {
    state.isFetchingOrganisations = false;
  },
  getOrganisationsSuccess(state, { organisations }) {
    state.isFetchingOrganisations = false;
    state.organisations = organisations;
  },
  createOrganisation(state, _) {
    state.isCreatingOrganisation = true;
  },
  createOrganisationError(state, _) {
    state.isCreatingOrganisation = false;
  },
  createOrganisationSuccess(state, organisation) {
    state.isCreatingOrganisation = false;
    state.organisations = (state.organisations || []).concat(organisation);
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};

// *****************************************
// DEPRECATED PLEASE DELETE
// *****************************************

import axios from "axios";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import Fuse from "fuse.js";
/* eslint-disable */
import {
  ISearchOrganisation,
  IOrgDictionary,
  IOrg,
  IOrgMember,
  IOrgMemberDictionary,
  ISortParameters,
} from "@/models";
// eslint-disable-next-line import/no-cycle
import { IRootState } from "../index";

export interface IOrgState {
  organisationsDictionary: IOrgDictionary;
  currentOrganisationId: IOrg | undefined;
  organisationsFilterText: string;
  fetchingOrganisations: boolean;
  organisationsSort: ISortParameters;
  memberDictionary: IOrgMemberDictionary;
  fetchingOrganisationMembers: boolean;
}

const defaultState: IOrgState = {
  organisationsDictionary: {},
  currentOrganisationId: undefined,
  organisationsFilterText: "",
  fetchingOrganisations: false,
  organisationsSort: {
    ascending: false,
    property: undefined,
  },
  memberDictionary: {},
  fetchingOrganisationMembers: false,
};

const getters: GetterTree<IOrgState, IRootState> = {
  organisation: (state: IOrgState) => (organisationId: number) =>
    state.organisationsDictionary[organisationId],
  organisations: (state: IOrgState) => () => {
    const organisations: IOrg[] = Object.values(
      state.organisationsDictionary
    ).filter((item: IOrg) => item.name !== "Demo Organisation");

    const sorted = [...organisations].sort((a: any, b: any) => {
      const { ascending, property } = state.organisationsSort;

      if (!property) {
        return 0;
      }

      const firstValue = a[property] || "";
      const secondValue = b[property] || "";

      const isDate: boolean =
        typeof firstValue === "string" &&
        !isNaN(new Date(firstValue).getTime());
      const isNumber: boolean = typeof firstValue === "number";

      const firstCompare: any = ascending ? firstValue : secondValue;
      const secondCompare: any = ascending ? secondValue : firstValue;

      if (isDate) {
        return (
          new Date(firstCompare).getTime() - new Date(secondCompare).getTime()
        );
      } else if (isNumber) {
        return firstCompare - secondCompare;
      } else {
        return firstCompare.localeCompare(secondCompare);
      }
    });

    return sorted;
  },
  members: (state: IOrgState) => (organisationId: number) =>
    state.memberDictionary[organisationId],
};

const actions: ActionTree<IOrgState, IRootState> = {
  async getOrganisations({ commit }, payload: ISearchOrganisation) {
    commit("getOrganisations");

    const organisations: IOrg[] = await axios.get("/orgs");

    commit("getOrganisationsSuccess", organisations);
  },
  selectOrganisation({ commit, state }, organisationId) {
    commit("selectOrganisation", organisationId);
  },
  async getMembers({ commit }, { organisationId }) {
    commit("getMembers");

    const orgMembers: IOrgMember[] = await axios.get(
      `/orgs/${organisationId}/members`
    );

    commit("getMembersSuccess", { orgId: organisationId, orgMembers });
  },
};

const mutations: MutationTree<IOrgState> = {
  getOrganisations(state: IOrgState, _) {
    state.fetchingOrganisations = true;
  },
  getOrganisationsSuccess(state: IOrgState, organisations) {
    state.organisationsDictionary = organisations.reduce(
      (acc: any, curr: any) => ({
        ...acc,
        [curr.id]: curr,
      }),
      {}
    );
    state.fetchingOrganisations = false;
  },
  selectOrganisation(state: IOrgState, organisationId) {
    if (organisationId) {
      state.currentOrganisationId = organisationId;
      window.localStorage.setItem("lastOrganisation", organisationId);
    }
  },
  setOrganisationsFilterText(state: IOrgState, filterText) {
    state.organisationsFilterText = filterText;
  },
  setOrganisationSort(state: IOrgState, organisationsSort) {
    state.organisationsSort = organisationsSort;
  },
  getMembers(state: IOrgState, _) {
    state.fetchingOrganisationMembers = true;
  },
  getMembersSuccess(state: IOrgState, { orgId, orgMembers }) {
    state.memberDictionary = {
      ...state.memberDictionary,
      [orgId]: orgMembers,
    };
    state.fetchingOrganisationMembers = false;
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};

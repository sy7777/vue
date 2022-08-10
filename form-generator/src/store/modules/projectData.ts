import { ActionTree, GetterTree, MutationTree } from "vuex";

import { IRootState } from "../index";
import { Layout } from "@/models";

export interface IProjectDataState {
  ocsStreamsLayout: Layout;
  ocsTypesLayout: Layout;
}

const defaultState: IProjectDataState = {
  ocsStreamsLayout: Layout.TableView,
  ocsTypesLayout: Layout.BoxView,
};

const getters: GetterTree<IProjectDataState, IRootState> = {};

const actions: ActionTree<IProjectDataState, IRootState> = {};

const mutations: MutationTree<IProjectDataState> = {
  setOcsStreamsLayout(state, { layout }) {
    state.ocsStreamsLayout = layout;
  },
  setOcsTypesLayout(state, { layout }) {
    state.ocsTypesLayout = layout;
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};

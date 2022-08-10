import axios from "axios";
import AuthConfig from "@/constants/auth";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { IUser, IAPIResponse, APIResponseStatus } from "@/models";
import { handleServerError } from "@/services";

import { IRootState } from "../index";

export interface IAuthState {
  user: null | IUser;
}

const defaultState: IAuthState = {
  user: null,
};

const getters: GetterTree<IAuthState, IRootState> = {
  user: (state) => state.user,
};

const actions: ActionTree<IAuthState, IRootState> = {
  async logout({ commit }) {
    try {
      const response: IAPIResponse = await axios.post("logout");

      if (response.status === APIResponseStatus.SUCCESS) {
        console.info("logged out");
      } else {
        throw new Error();
      }
    } catch (error) {
      commit("error");
      handleServerError(error);
    }
  },
};

const mutations: MutationTree<IAuthState> = {};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};

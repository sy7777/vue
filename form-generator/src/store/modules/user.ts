import axios from "axios";
import { ActionTree, GetterTree, MutationTree } from "vuex";

import { IRootState } from "../index";
import { IAPIResponse, APIResponseStatus, IUser } from "@/models";
import { handleServerError } from "@/services";

export interface IUserState {
  user: IUser | undefined;
  isFetchingUser: boolean;
}

const defaultState: IUserState = {
  user: undefined,
  isFetchingUser: false,
};

const getters: GetterTree<IUserState, IRootState> = {
  getUser: (state) => () => state.user,
};

const actions: ActionTree<IUserState, IRootState> = {
  async getUserWithCache({ state, dispatch }) {
    const maybeUser: IUser | undefined = state.user;

    if (typeof maybeUser === "undefined") {
      return dispatch("getUser");
    } else {
      return Promise.resolve(maybeUser as IUser);
    }
  },
  async getUser({ commit }) {
    commit("getUser");

    try {
      const response: IAPIResponse = await axios.get("user");

      if (response.status === APIResponseStatus.SUCCESS) {
        const user: IUser = response.data.user;

        commit("getUserSuccess", {
          user,
        });

        return user;
      } else {
        throw new Error();
        return;
      }
    } catch (error) {
      commit("getUserError");
      handleServerError(error);
      return;
    }
  },
};

const mutations: MutationTree<IUserState> = {
  getUser(state) {
    state.isFetchingUser = true;
  },
  getUserError(state) {
    state.isFetchingUser = false;
  },
  getUserSuccess(
    state,
    {
      user,
    }: {
      user: IUser;
    }
  ) {
    state.isFetchingUser = false;
    state.user = user;
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};

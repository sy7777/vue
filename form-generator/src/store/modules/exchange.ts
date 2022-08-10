import axios from "axios";
import { ActionTree, GetterTree, MutationTree } from "vuex";

import { IRootState } from "../index";
import { IAPIResponse, APIResponseStatus } from "@/models";

export interface IExchangeState {
  projectTokensDictionary: any;
  isFetchingProjectTokens: boolean;
  isCreatingExchangeToken: boolean;
  isDeletingExchangeToken: boolean;
}

const defaultState: IExchangeState = {
  projectTokensDictionary: {},
  isFetchingProjectTokens: false,
  isCreatingExchangeToken: false,
  isDeletingExchangeToken: false,
};

const getters: GetterTree<IExchangeState, IRootState> = {
  projectTokens: (state) => (projectId: number) => {
    return state.projectTokensDictionary[projectId];
  },
  getProjectIdByTokenId: (state) => (tokenId: number) => {
    return Object.keys(state.projectTokensDictionary).find((projectId) => {
      const tokenIds = state.projectTokensDictionary[projectId].map(
        (item) => item.id
      );
      return tokenIds.includes(tokenId);
    });
  },
};

const actions: ActionTree<IExchangeState, IRootState> = {
  async getProjectTokensWithCache({ state, dispatch }, { projectId }) {
    const maybeTokens: any = state.projectTokensDictionary[projectId];

    if (typeof maybeTokens === "undefined") {
      return dispatch("getProjectTokens", { projectId });
    } else {
      return Promise.resolve(maybeTokens);
    }
  },
  async getProjectTokens({ commit }, { projectId }) {
    commit("getProjectTokens");

    try {
      const response: IAPIResponse = await axios.get(
        `projects/${projectId}/exchange/tokens`
      );

      if (response.status === APIResponseStatus.SUCCESS) {
        const tokens: any[] = response.data.tokens;

        commit("getProjectTokensSuccess", {
          projectId,
          tokens,
        });

        return tokens;
      } else {
        console.error(`Response from server: ${response.message}`);
        commit("getProjectTokensError");
        return undefined;
      }
    } catch (error) {
      console.error(error);
      commit("getProjectTokensError");
      return undefined;
    }
  },
  async createExchangeToken(
    { commit },
    {
      projectId,
      name,
      token,
    }: {
      projectId: number;
      name: string;
      token: string;
    }
  ) {
    commit("createExchangeToken");

    try {
      const endpoint = `/projects/${projectId}/exchange/tokens`;
      const response: IAPIResponse = await axios.post(endpoint, {
        name,
        token,
      });

      if (response.status === APIResponseStatus.SUCCESS) {
        const exchangeToken: any = response.data.token;

        commit("createExchangeTokenSuccess", {
          projectId,
          exchangeToken,
        });

        return exchangeToken;
      } else {
        console.error(`Response from server: ${response.message}`);
        commit("createExchangeTokenError");
        return undefined;
      }
    } catch (error) {
      console.error(error);
      commit("createExchangeTokenError");
      return undefined;
    }
  },
  async deleteExchangeToken(
    { commit },
    {
      projectId,
      token,
    }: {
      projectId: number;
      token: any;
    }
  ) {
    commit("deleteExchangeToken");

    try {
      const endpoint = `/orgs/${projectId}/exchange/tokens/${token.id}`;
      const response: IAPIResponse = await axios.delete(endpoint);

      if (response.status === APIResponseStatus.SUCCESS) {
        commit("deleteExchangeTokenSuccess", { projectId, token });

        return true;
      } else {
        console.error(`Response from server: ${response.message}`);
        commit("deleteExchangeTokenError");
        return false;
      }
    } catch (error) {
      console.error(error);
      commit("deleteExchangeTokenError");
      return false;
    }
  },
};

const mutations: MutationTree<IExchangeState> = {
  getProjectTokens(state, _) {
    state.isFetchingProjectTokens = true;
  },
  getProjectTokensError(state, _) {
    state.isFetchingProjectTokens = false;
  },
  getProjectTokensSuccess(state, { projectId, tokens }) {
    state.isFetchingProjectTokens = false;
    state.projectTokensDictionary = {
      ...state.projectTokensDictionary,
      [projectId]: tokens,
    };
  },
  createExchangeToken(state, _) {
    state.isCreatingExchangeToken = true;
  },
  createExchangeTokenError(state, _) {
    state.isCreatingExchangeToken = false;
  },
  createExchangeTokenSuccess(state, { projectId, exchangeToken }) {
    state.isCreatingExchangeToken = false;
    state.projectTokensDictionary = {
      ...state.projectTokensDictionary,
      [projectId]: (state.projectTokensDictionary[projectId] || []).concat(
        exchangeToken
      ),
    };
  },
  deleteExchangeToken(state, _) {
    state.isDeletingExchangeToken = true;
  },
  deleteExchangeTokenError(state, _) {
    state.isDeletingExchangeToken = false;
  },
  deleteExchangeTokenSuccess(state, { projectId, token }) {
    state.isDeletingExchangeToken = false;
    state.projectTokensDictionary = {
      ...state.projectTokensDictionary,
      [projectId]: state.projectTokensDictionary[projectId].filter((item) => {
        return item.id !== token.id;
      }),
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

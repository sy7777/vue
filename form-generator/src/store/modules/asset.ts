import axios from "axios";
import { ActionTree, GetterTree, MutationTree } from "vuex";

import { IRootState } from "../index";
import { IAsset, IAssetDictionary, IAssetSharingToken } from "@/shared/models";
import { ISdsStream } from "@/models";

export interface IAssetState {
  assetsDictionary: IAssetDictionary;
  isSavingAsset: boolean;
  isFetchingAssets: boolean;
  isDeletingAsset: boolean;
  isUpdatingAsset: boolean;
  pendingAssetStreams: ISdsStream[];
  isCreatingSharingToken: boolean;
  isUpdatingSharingToken: boolean;
  isDeletingSharingToken: boolean;
}

const defaultState: IAssetState = {
  assetsDictionary: {},
  isSavingAsset: false,
  isFetchingAssets: false,
  isDeletingAsset: false,
  isUpdatingAsset: false,
  pendingAssetStreams: [],
  isCreatingSharingToken: false,
  isUpdatingSharingToken: false,
  isDeletingSharingToken: false,
};

const getters: GetterTree<IAssetState, IRootState> = {
  assets: (state) => (projectId: number) => {
    return state.assetsDictionary[projectId];
  },
  pendingAssetStreams: (state) => () => {
    return state.pendingAssetStreams;
  },
};

const actions: ActionTree<IAssetState, IRootState> = {
  async getAssetsWithCache(
    { state, dispatch },
    {
      projectId,
    }: {
      projectId: number;
    }
  ) {
    const maybeAssets: IAsset[] | undefined = state.assetsDictionary[projectId];

    if (typeof maybeAssets === "undefined") {
      return dispatch("getAssets", {
        projectId,
      });
    } else {
      return Promise.resolve(maybeAssets);
    }
  },
  async updateAsset(
    { commit },
    {
      projectId,
      asset,
    }: {
      projectId: number;
      asset: IAsset;
    }
  ) {
    commit("updateAsset");

    try {
      const updatedAsset: IAsset = await axios.put(
        `/projects/${projectId}/streams/assets/${asset.id}`,
        asset
      );

      commit("updateAssetSuccess", {
        projectId,
        updatedAsset,
      });

      return updatedAsset;
    } catch (error) {
      console.error(error);
      commit("updateAssetError");
      return null;
    }
  },
  async saveAsset(
    { commit },
    {
      projectId,
      streams,
      name,
    }: {
      projectId: number;
      streams: {
        streamId: string;
        properties: any;
        searchParameters: any;
      }[];
      name: string;
    }
  ) {
    commit("saveAsset");

    try {
      const response: any = await axios.post(
        `/projects/${projectId}/streams/assets`,
        {
          streams,
          name,
        }
      );

      commit("saveAssetSuccess", {
        projectId,
        asset: response,
      });

      return response;
    } catch (error) {
      console.error(error);
      commit("saveAssetError");
    }
  },
  async getAssets({ commit }, { projectId }) {
    commit("getAssets");

    try {
      const response: IAsset[] = await axios.get(
        `/projects/${projectId}/streams/assets`
      );

      commit("getAssetsSuccess", {
        projectId,
        assets: response,
      });

      return response;
    } catch (error) {
      console.error(error);
      commit("getAssetsError");

      return [];
    }
  },
  async deleteAsset({ commit }, { projectId, assetId }) {
    commit("deleteAsset");

    try {
      const response = await axios.delete(
        `/projects/${projectId}/streams/assets/${assetId}`
      );

      commit("deleteAssetSuccess", {
        projectId,
        assetId,
      });

      return true;
    } catch (error) {
      console.error(error);
      commit("deleteAssetError");
      return false;
    }
  },
  async createSharingToken({ commit }, { projectId, assetId, sharingToken }) {
    commit("createSharingToken");

    try {
      const response = await axios.post(
        `/projects/${projectId}/streams/assets/${assetId}/sharing-tokens`,
        sharingToken
      );

      commit("createSharingTokenSuccess", {
        projectId,
        assetId,
        sharingToken: response,
      });

      return response;
    } catch (error) {
      console.error(error);
      commit("createSharingTokenError");
      return undefined;
    }
  },
  async updateSharingToken({ commit }, { projectId, assetId, sharingToken }) {
    commit("updateSharingToken");

    try {
      const response = await axios.put(
        `/projects/${projectId}/streams/assets/${assetId}/sharing-tokens/${sharingToken.id}`,
        sharingToken
      );

      commit("updateSharingTokenSuccess", {
        projectId,
        assetId,
        sharingToken: response,
      });

      return response;
    } catch (error) {
      console.error(error);
      commit("updateSharingTokenError");
      return undefined;
    }
  },
  async deleteSharingToken({ commit }, { projectId, assetId, sharingToken }) {
    commit("deleteSharingToken");

    try {
      await axios.delete(
        `/projects/${projectId}/streams/assets/${assetId}/sharing-tokens/${sharingToken.id}`
      );

      commit("deleteSharingTokenSuccess", {
        projectId,
        assetId,
        sharingToken,
      });

      return true;
    } catch (error) {
      console.error(error);
      commit("deleteSharingTokenError");
      return false;
    }
  },
};

const mutations: MutationTree<IAssetState> = {
  updateAsset(state, _) {
    state.isUpdatingAsset = true;
  },
  updateAssetError(state, _) {
    state.isUpdatingAsset = false;
  },
  updateAssetSuccess(state, { projectId, updatedAsset }) {
    state.isUpdatingAsset = false;
    state.assetsDictionary = {
      ...state.assetsDictionary,
      [projectId]: state.assetsDictionary[projectId].map((asset: IAsset) => {
        if (asset.id === updatedAsset.id) {
          return updatedAsset;
        } else {
          return asset;
        }
      }),
    };
  },
  saveAsset(state, _) {
    state.isSavingAsset = true;
  },
  saveAssetError(state, _) {
    state.isSavingAsset = false;
  },
  saveAssetSuccess(state, { projectId, asset }) {
    state.isSavingAsset = false;
    state.assetsDictionary = {
      ...state.assetsDictionary,
      [projectId]: state.assetsDictionary[projectId].concat(asset),
    };
  },
  getAssets(state, _) {
    state.isFetchingAssets = true;
  },
  getAssetsError(state, _) {
    state.isFetchingAssets = false;
  },
  getAssetsSuccess(state, { projectId, assets }) {
    state.isFetchingAssets = false;
    state.assetsDictionary = {
      ...state.assetsDictionary,
      [projectId]: assets,
    };
  },
  deleteAsset(state, _) {
    state.isDeletingAsset = true;
  },
  deleteAssetError(state, _) {
    state.isDeletingAsset = false;
  },
  deleteAssetSuccess(state, { projectId, assetId }) {
    state.isDeletingAsset = false;
    state.assetsDictionary = {
      ...state.assetsDictionary,
      [projectId]: state.assetsDictionary[projectId].filter(
        (item: IAsset) => item.id !== assetId
      ),
    };
  },
  updatePendingAssetStreams(state, { sdsStreams }) {
    state.pendingAssetStreams = sdsStreams;
  },
  createSharingToken(state, _) {
    state.isCreatingSharingToken = true;
  },
  createSharingTokenError(state, _) {
    state.isCreatingSharingToken = false;
  },
  createSharingTokenSuccess(state, { projectId, assetId, sharingToken }) {
    state.isCreatingSharingToken = false;
    state.assetsDictionary = {
      ...state.assetsDictionary,
      [projectId]: state.assetsDictionary[projectId].map((asset: IAsset) => {
        if (asset.id === assetId) {
          return {
            ...asset,
            sharingTokens: asset.sharingTokens.concat(sharingToken),
          };
        } else {
          return asset;
        }
      }),
    };
  },
  updateSharingToken(state, _) {
    state.isUpdatingSharingToken = true;
  },
  updateSharingTokenError(state, _) {
    state.isUpdatingSharingToken = false;
  },
  updateSharingTokenSuccess(state, { projectId, assetId, sharingToken }) {
    state.isUpdatingSharingToken = false;
    state.assetsDictionary = {
      ...state.assetsDictionary,
      [projectId]: state.assetsDictionary[projectId].map((asset: IAsset) => {
        if (asset.id === assetId) {
          return {
            ...asset,
            sharingTokens: asset.sharingTokens.map(
              (item: IAssetSharingToken) => {
                if (item.id === sharingToken.id) {
                  return sharingToken;
                } else {
                  return item;
                }
              }
            ),
          };
        } else {
          return asset;
        }
      }),
    };
  },
  deleteSharingToken(state, _) {
    state.isDeletingSharingToken = true;
  },
  deleteSharingTokenError(state, _) {
    state.isDeletingSharingToken = false;
  },
  deleteSharingTokenSuccess(state, { projectId, assetId, sharingToken }) {
    state.isDeletingSharingToken = false;
    state.assetsDictionary = {
      ...state.assetsDictionary,
      [projectId]: state.assetsDictionary[projectId].map((asset: IAsset) => {
        if (asset.id === assetId) {
          return {
            ...asset,
            sharingTokens: asset.sharingTokens.filter(
              (item: IAssetSharingToken) => item.id !== sharingToken.id
            ),
          };
        } else {
          return asset;
        }
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

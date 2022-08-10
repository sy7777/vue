import axios from "axios";
import { ActionTree, GetterTree, MutationTree } from "vuex";

import { IRootState } from "../index";
import {
  ISdsType,
  IProjectTypesDictionary,
  ICommunityTypesDictionary,
  ISharingTypesDictionary,
  IAPIResponse,
  APIResponseStatus,
} from "@/models";

export interface ISdsTypesState {
  projectTypesDictionary: IProjectTypesDictionary;
  isFetchingSdsTypes: boolean;
  communityTypesDictionary: ICommunityTypesDictionary;
  isFetchingCommunitySdsTypes: boolean;
  sharingTypesDictionary: ISharingTypesDictionary;
  isFetchingSharingSdsTypes: boolean;
  isCreatingType: boolean;
  isDeletingType: boolean;
}

const defaultState: ISdsTypesState = {
  projectTypesDictionary: {},
  isFetchingSdsTypes: false,
  communityTypesDictionary: {},
  isFetchingCommunitySdsTypes: false,
  sharingTypesDictionary: {},
  isFetchingSharingSdsTypes: false,
  isCreatingType: false,
  isDeletingType: false,
};

const getters: GetterTree<ISdsTypesState, IRootState> = {
  getSdsTypes:
    (state) =>
    ({ projectId, shareId }: any) => {
      return state.projectTypesDictionary[projectId || shareId];
    },
  getSdsTypeById:
    (state) =>
    ({ projectId, shareId, sdsTypeId }: any) => {
      return (state.projectTypesDictionary[projectId || shareId] || []).find(
        (item: ISdsType) => item.Id === sdsTypeId
      );
    },
  getCommunitySdsTypes:
    (state) =>
    ({ communityId }) => {
      return state.communityTypesDictionary[communityId];
    },
};

const actions: ActionTree<ISdsTypesState, IRootState> = {
  async getSdsTypesWithCache({ state, dispatch }, { shareId, projectId }) {
    const maybeSdsTypes: ISdsType[] | undefined =
      state.projectTypesDictionary[projectId || shareId];

    if (typeof maybeSdsTypes === "undefined") {
      return dispatch("getSdsTypes", { shareId, projectId });
    } else {
      return Promise.resolve(maybeSdsTypes);
    }
  },
  async getSdsTypes({ commit }, { shareId, projectId }) {
    commit("getSdsTypes");

    try {
      const endpoint = `/projects/${projectId}/types`;

      const sdsTypes: ISdsType[] = await axios.get(endpoint);

      commit("getSdsTypesSuccess", { shareId, projectId, sdsTypes });

      return sdsTypes;
    } catch (error) {
      console.error(error);
      commit("getSdsTypesError");

      return undefined;
    }
  },
  async getCommunitySdsTypesWithCache({ state, dispatch }, { communityId }) {
    const maybeSdsTypes: ISdsType[] | undefined =
      state.communityTypesDictionary[communityId];

    if (typeof maybeSdsTypes === "undefined") {
      return dispatch("getCommunitySdsTypes", { communityId });
    } else {
      return Promise.resolve(maybeSdsTypes);
    }
  },
  async getCommunitySdsTypes({ commit }, { communityId }) {
    commit("getCommunitySdsTypes");

    try {
      const endpoint = `/communities/axt/${communityId}/types`;
      const response: IAPIResponse = await axios.get(endpoint);

      if (response.status === APIResponseStatus.SUCCESS) {
        const sdsTypes: ISdsType[] = response.data.sdsTypes;

        commit("getCommunitySdsTypesSuccess", {
          sdsTypes,
        });

        return sdsTypes;
      } else {
        console.error(`Response from server: ${response.message}`);
        commit("getCommunitySdsTypesError");
        return undefined;
      }
    } catch (error) {
      console.error(error);
      commit("getCommunitySdsTypesError");
      return undefined;
    }
  },
  async getSharingSdsTypesWithCache({ state, dispatch }, { assetId }) {
    const maybeSdsTypes: ISdsType[] | undefined =
      state.sharingTypesDictionary[assetId];

    if (typeof maybeSdsTypes === "undefined") {
      return dispatch("getSharingSdsTypes", { assetId });
    } else {
      return Promise.resolve(maybeSdsTypes);
    }
  },
  async getSharingSdsTypes({ commit }, { assetId }) {
    commit("getSharingSdsTypes");

    try {
      const endpoint = `/sharing/assets/${assetId}/types`;
      const response: IAPIResponse = await axios.get(endpoint);

      if (response.status === APIResponseStatus.SUCCESS) {
        const sdsTypes: ISdsType[] = response.data.sdsTypes;

        commit("getSharingSdsTypesSuccess", {
          sdsTypes,
        });

        return sdsTypes;
      } else {
        console.error(`Response from server: ${response.message}`);
        commit("getSharingSdsTypesError");
        return undefined;
      }
    } catch (error) {
      console.error(error);
      commit("getSharingSdsTypesError");
      return undefined;
    }
  },
  async createType(
    { commit },
    {
      projectId,
      sdsType,
    }: {
      projectId: number;
      sdsType: ISdsType;
    }
  ) {
    commit("createType");

    try {
      const endpoint = `/projects/${projectId}/exchange/types`;
      const response: IAPIResponse = await axios.post(endpoint, {
        sdsType,
      });

      if (response.status === APIResponseStatus.SUCCESS) {
        const newSdsType: ISdsType = response.data.sdsType;

        commit("createTypeSuccess", {
          projectId,
          sdsType: newSdsType,
        });

        //Vue.prototype.$notify({
        //  text: 'Successfully created type',
        //  type: 'success',
        //  position: 'top center',
        //});

        return newSdsType;
      } else {
        console.error(`Response from server: ${response.message}`);
        commit("createTypeError");

        //Vue.prototype.$notify({
        //  text: response.message,
        //  type: 'error',
        //  position: 'top center',
        //});

        return undefined;
      }
    } catch (error) {
      console.error(error);
      commit("createTypeError");

      //Vue.prototype.$notify({
      //  text: 'An unexpected error has occurred',
      //  type: 'error',
      //  position: 'top center',
      //});

      return undefined;
    }
  },
  async deleteType(
    { commit },
    {
      projectId,
      sdsType,
    }: {
      projectId: number;
      sdsType: ISdsType;
    }
  ) {
    commit("deleteType");

    try {
      const endpoint = `/projects/${projectId}/exchange/types/${sdsType.Id}`;
      const response: IAPIResponse = await axios.delete(endpoint);

      if (response.status === APIResponseStatus.SUCCESS) {
        commit("deleteTypeSuccess", {
          projectId,
          sdsType,
        });

        //Vue.prototype.$notify({
        //  text: 'Successfully deleted type',
        //  type: 'success',
        //  position: 'top center',
        //});
      } else {
        console.error(`Response from server: ${response.message}`);
        commit("deleteTypeError");

        //Vue.prototype.$notify({
        //  text: response.message,
        //  type: 'error',
        //  position: 'top center',
        //});
      }
    } catch (error) {
      console.error(error);
      commit("deleteTypeError");

      //Vue.prototype.$notify({
      //  text: 'An unexpected error has occurred',
      //  type: 'error',
      //  position: 'top center',
      //});
    }
  },
};

const mutations: MutationTree<ISdsTypesState> = {
  getSdsTypes(state, _) {
    state.isFetchingSdsTypes = true;
  },
  getSdsTypesError(state, _) {
    state.isFetchingSdsTypes = false;
  },
  getSdsTypesSuccess(state, { projectId, shareId, sdsTypes }) {
    state.isFetchingSdsTypes = false;
    state.projectTypesDictionary = {
      ...state.projectTypesDictionary,
      [projectId || shareId]: sdsTypes,
    };
  },
  getCommunitySdsTypes(state, _) {
    state.isFetchingCommunitySdsTypes = true;
  },
  getCommunitySdsTypesError(state, _) {
    state.isFetchingCommunitySdsTypes = false;
  },
  getCommunitySdsTypesSuccess(state, { communityId, sdsTypes }) {
    state.isFetchingCommunitySdsTypes = false;
    state.communityTypesDictionary = {
      ...state.communityTypesDictionary,
      [communityId]: sdsTypes,
    };
  },
  getSharingSdsTypes(state, _) {
    state.isFetchingSharingSdsTypes = true;
  },
  getSharingSdsTypesError(state, _) {
    state.isFetchingSharingSdsTypes = false;
  },
  getSharingSdsTypesSuccess(state, { assetId, sdsTypes }) {
    state.isFetchingSharingSdsTypes = false;
    state.sharingTypesDictionary = {
      ...state.sharingTypesDictionary,
      [assetId]: sdsTypes,
    };
  },
  createType(state, _) {
    state.isCreatingType = true;
  },
  createTypeError(state, _) {
    state.isCreatingType = false;
  },
  createTypeSuccess(state, { projectId, sdsType }) {
    state.isCreatingType = false;
    state.projectTypesDictionary = {
      ...state.projectTypesDictionary,
      [projectId]: (state.projectTypesDictionary[projectId] || []).concat(
        sdsType
      ),
    };
  },
  deleteType(state, _) {
    state.isDeletingType = true;
  },
  deleteTypeError(state, _) {
    state.isDeletingType = false;
  },
  deleteTypeSuccess(state, { projectId, sdsType }) {
    state.isDeletingType = false;
    state.projectTypesDictionary = {
      ...state.projectTypesDictionary,
      [projectId]: (state.projectTypesDictionary[projectId] || []).filter(
        (item: ISdsType) => item.Id !== sdsType.Id
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

import axios from "axios";
import { ActionTree, GetterTree, MutationTree } from "vuex";

import { IRootState } from "../index";
import {
  IProjectStreamsDictionary,
  ISharingStreamsDictionary,
  ISdsStream,
  IAPIResponse,
  APIResponseStatus,
} from "@/models";

export interface ISdsStreamsState {
  projectStreamsDictionary: IProjectStreamsDictionary;
  isFetchingSdsStreams: boolean;
  sharingStreamsDictionary: ISharingStreamsDictionary;
  isFetchingSharingSdsStreams: boolean;
  isCreatingStream: boolean;
  isDeletingStream: boolean;
}

const defaultState: ISdsStreamsState = {
  projectStreamsDictionary: {},
  isFetchingSdsStreams: false,
  sharingStreamsDictionary: {},
  isFetchingSharingSdsStreams: false,
  isCreatingStream: false,
  isDeletingStream: false,
};

const getters: GetterTree<ISdsStreamsState, IRootState> = {
  getSdsStreams:
    (state) =>
    ({ projectId, shareId }: any) => {
      return state.projectStreamsDictionary[projectId || shareId];
    },
  getSdsStreamById:
    (state) =>
    ({ projectId, shareId, sdsStreamId }: any) => {
      return (state.projectStreamsDictionary[projectId || shareId] || []).find(
        (item: ISdsStream) => item.Id === sdsStreamId
      );
    },
};

const actions: ActionTree<ISdsStreamsState, IRootState> = {
  async getSdsStreamsWithCache({ state, dispatch }, { shareId, projectId }) {
    const maybeSdsStreams: ISdsStream[] | undefined =
      state.projectStreamsDictionary[projectId || shareId];

    if (typeof maybeSdsStreams === "undefined") {
      return dispatch("getSdsStreams", { shareId, projectId });
    } else {
      return Promise.resolve(maybeSdsStreams);
    }
  },
  async getSdsStreams({ commit }, { shareId, projectId }) {
    commit("getSdsStreams");

    try {
      const endpoint = `/projects/${projectId}/streams`;

      const sdsStreams: ISdsStream[] = await axios.get(endpoint);

      commit("getSdsStreamsSuccess", { shareId, projectId, sdsStreams });

      return sdsStreams;
    } catch (error) {
      console.error(error);
      commit("getSdsStreamsError");

      return undefined;
    }
  },
  async getSharingSdsStreamsWithCache({ state, dispatch }, { assetId }) {
    const maybeSdsStreams: ISdsStream[] | undefined =
      state.sharingStreamsDictionary[assetId];

    if (typeof maybeSdsStreams === "undefined") {
      return dispatch("getSharingSdsStreams", { assetId });
    } else {
      return Promise.resolve(maybeSdsStreams);
    }
  },
  async getSharingSdsStreams({ commit }, { assetId }) {
    commit("getSharingSdsStreams");

    try {
      const endpoint = `/sharing/assets/${assetId}/streams`;
      const response: IAPIResponse = await axios.get(endpoint);

      if (response.status === APIResponseStatus.SUCCESS) {
        const sdsStreams: ISdsStream[] = response.data.sdsStreams;

        commit("getSharingSdsStreamsSuccess", {
          assetId,
          sdsStreams,
        });

        return sdsStreams;
      } else {
        console.error(`Response from server: ${response.message}`);
        commit("getSharingSdsStreamsError");
        return undefined;
      }
    } catch (error) {
      console.error(error);
      commit("getSharingSdsStreamsError");
      return undefined;
    }
  },
  async createStream(
    { commit },
    {
      projectId,
      sdsStream,
    }: {
      projectId: number;
      sdsStream: ISdsStream;
    }
  ) {
    commit("createStream");

    try {
      const endpoint = `/projects/${projectId}/exchange/streams`;
      const response: IAPIResponse = await axios.post(endpoint, {
        sdsStream,
      });

      if (response.status === APIResponseStatus.SUCCESS) {
        const sdsStream: ISdsStream = response.data.sdsStream;

        commit("createStreamSuccess", {
          projectId,
          sdsStream,
        });

        //Vue.prototype.$notify({
        //  text: 'Successfully created stream',
        //  type: "success",
        //  position: "top center",
        //});

        return sdsStream;
      } else {
        console.error(`Response from server: ${response.message}`);
        commit("createStreamError");

        //Vue.prototype.$notify({
        //  text: response.message,
        //  type: "error",
        //  position: "top center",
        //});

        return undefined;
      }
    } catch (error) {
      console.error(error);
      commit("createStreamError");

      //Vue.prototype.$notify({
      //  text: 'An unexpected error has occurred',
      //  type: "error",
      //  position: "top center",
      //});

      return undefined;
    }
  },
  async deleteStream(
    { commit },
    {
      projectId,
      sdsStream,
    }: {
      projectId: number;
      sdsStream: ISdsStream;
    }
  ) {
    commit("deleteStream");

    try {
      const endpoint = `/projects/${projectId}/exchange/streams/${sdsStream.Id}`;
      const response: IAPIResponse = await axios.delete(endpoint);

      if (response.status === APIResponseStatus.SUCCESS) {
        commit("deleteStreamSuccess", {
          projectId,
          sdsStream,
        });

        //Vue.prototype.$notify({
        //  text: 'Successfully deleted stream',
        //  type: 'success',
        //  position: 'top center',
        //});
      } else {
        console.error(`Response from server: ${response.message}`);
        commit("deleteStreamError");

        //Vue.prototype.$notify({
        //  text: response.message,
        //  type: 'error',
        //  position: 'top center',
        //});
      }
    } catch (error) {
      console.error(error);
      commit("deleteStreamError");

      //Vue.prototype.$notify({
      //  text: 'An unexpected error has occurred',
      //  type: 'error',
      //  position: 'top center',
      //});
    }
  },
};

const mutations: MutationTree<ISdsStreamsState> = {
  getSdsStreams(state, _) {
    state.isFetchingSdsStreams = true;
  },
  getSdsStreamsError(state, _) {
    state.isFetchingSdsStreams = false;
  },
  getSdsStreamsSuccess(state, { projectId, shareId, sdsStreams }) {
    state.isFetchingSdsStreams = false;
    state.projectStreamsDictionary = {
      ...state.projectStreamsDictionary,
      [projectId || shareId]: sdsStreams,
    };
  },
  getSharingSdsStreams(state, _) {
    state.isFetchingSharingSdsStreams = true;
  },
  getSharingSdsStreamsError(state, _) {
    state.isFetchingSharingSdsStreams = false;
  },
  getSharingSdsStreamsSuccess(state, { assetId, sdsStreams }) {
    state.isFetchingSharingSdsStreams = false;
    state.sharingStreamsDictionary = {
      ...state.sharingStreamsDictionary,
      [assetId]: sdsStreams,
    };
  },
  createStream(state, _) {
    state.isCreatingStream = true;
  },
  createStreamError(state, _) {
    state.isCreatingStream = false;
  },
  createStreamSuccess(state, { projectId, sdsStream }) {
    state.isCreatingStream = false;
    state.projectStreamsDictionary = {
      ...state.projectStreamsDictionary,
      [projectId]: (state.projectStreamsDictionary[projectId] || []).concat(
        sdsStream
      ),
    };
  },
  deleteStream(state, _) {
    state.isDeletingStream = true;
  },
  deleteStreamError(state, _) {
    state.isDeletingStream = false;
  },
  deleteStreamSuccess(state, { projectId, sdsStream }) {
    state.isDeletingStream = false;
    state.projectStreamsDictionary = {
      ...state.projectStreamsDictionary,
      [projectId]: (state.projectStreamsDictionary[projectId] || []).filter(
        (item: ISdsStream) => item.Id !== sdsStream.Id
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

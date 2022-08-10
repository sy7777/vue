import axios from "axios";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import hash from "object-hash";

import { IRootState } from "../index";
import { ISdsTypeStreamDataDictionary } from "@/models";
import { ISdsSearchParameters } from "@/shared/models";
import { getStreamDataByTypeEndpoint } from "@/services";

export interface ISdsTypeState {
  sdsTypeStreamDataDictionary: ISdsTypeStreamDataDictionary;
  isFetchingSdsTypeStreamData: boolean;
}

const defaultState: ISdsTypeState = {
  sdsTypeStreamDataDictionary: {},
  isFetchingSdsTypeStreamData: false,
};

const sortMultiStreamData = (data: any[]): any[] => {
  return [...data].sort((a: any, b: any) => {
    try {
      if (!a.length || !b.length) {
        return 1;
      }

      const firstCmp = a[0].data.timestamp || a[0].data.Timestamp;
      const secondCmp = b[0].data.timestamp || b[0].data.Timestamp;

      if (firstCmp && secondCmp) {
        return new Date(secondCmp).getTime() - new Date(firstCmp).getTime();
      } else {
        return 1;
      }
    } catch (error) {
      return 1;
    }
  });
};

const getters: GetterTree<ISdsTypeState, IRootState> = {
  getStreamData:
    (state) =>
    ({ sdsTypeId, searchParameters }: any) => {
      const { startIndex, endIndex, count, useCount, temporal } =
        searchParameters;
      const searchParameterHash: string = hash({
        startIndex,
        endIndex,
        count,
        useCount,
        temporal,
      });

      return (state.sdsTypeStreamDataDictionary[sdsTypeId] || {})[
        searchParameterHash
      ];
    },
};

const actions: ActionTree<ISdsTypeState, IRootState> = {
  async getSdsTypeStreamData(
    { commit },
    {
      sdsTypeId,
      projectId,
      searchParameters,
    }: {
      sdsTypeId: string;
      projectId?: number;
      searchParameters: ISdsSearchParameters;
    }
  ) {
    commit("getSdsTypeStreamData");

    const endpoint: string = getStreamDataByTypeEndpoint({
      projectId,
      typeId: sdsTypeId,
      searchParameters,
    });

    try {
      const response: any = await axios.get(endpoint);
      const sortedData: any[] = sortMultiStreamData(response.data);

      commit("getSdsTypeStreamDataSuccess", {
        sdsTypeId,
        searchParameters,
        data: sortedData,
      });

      return sortedData;
    } catch (error) {
      console.error(error);
      commit("getSdsTypeStreamDataError");

      return undefined;
    }
  },
};

const mutations: MutationTree<ISdsTypeState> = {
  getSdsTypeStreamData(state, _) {
    state.isFetchingSdsTypeStreamData = true;
  },
  getSdsTypeStreamDataError(state, _) {
    state.isFetchingSdsTypeStreamData = false;
  },
  getSdsTypeStreamDataSuccess(
    state,
    {
      sdsTypeId,
      searchParameters,
      data,
    }: {
      sdsTypeId: string;
      searchParameters: ISdsSearchParameters;
      data: any[];
    }
  ) {
    const { startIndex, endIndex, count, useCount, temporal } =
      searchParameters;
    const searchParameterHash: string = hash({
      startIndex,
      endIndex,
      count,
      useCount,
      temporal,
    });

    state.isFetchingSdsTypeStreamData = false;
    state.sdsTypeStreamDataDictionary = {
      ...state.sdsTypeStreamDataDictionary,
      [sdsTypeId]: {
        ...state.sdsTypeStreamDataDictionary[sdsTypeId],
        [searchParameterHash]: data,
      },
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

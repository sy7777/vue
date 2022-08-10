import axios from "axios";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import hash from "object-hash";

import { IRootState } from "../index";
import {
  ISdsStreamDataDictionary,
  ISdsStream,
  ISdsType,
  IAPIResponse,
  APIResponseStatus,
} from "@/models";
import { ISdsSearchParameters } from "@/shared/models";
import { getStreamDataEndpoint } from "@/services";
import { getSdsSearchIndexByPeriod } from "@/shared/services";

export interface ISdsStreamState {
  sdsStreamDataDictionary: ISdsStreamDataDictionary;
  isFetchingSdsStreamData: boolean;
}

const defaultState: ISdsStreamState = {
  sdsStreamDataDictionary: {},
  isFetchingSdsStreamData: false,
};

const key = (...args: any): string => {
  return (
    args.reduce((acc: string, item: any) => {
      return acc || item.toString();
    }, "") || "key_error"
  );
};

const hashSearchParameters = (
  searchParameters: ISdsSearchParameters
): string => {
  const { startIndex, endIndex, count, useCount } = searchParameters;

  return hash({
    startIndex,
    endIndex,
    count,
    useCount,
  });
};

const getters: GetterTree<ISdsStreamState, IRootState> = {
  getStreamData:
    (state) =>
    ({ sdsStreamId, searchParameters }: any) => {
      const searchParameterHash: string =
        hashSearchParameters(searchParameters);

      return (state.sdsStreamDataDictionary[sdsStreamId] || {})[
        searchParameterHash
      ];
    },
};

const actions: ActionTree<ISdsStreamState, IRootState> = {
  async getSdsStreamDataWithCache(
    { state, dispatch },
    {
      projectId,
      shareId,
      sdsStreamId,
      searchParameters,
    }: {
      projectId?: number;
      shareId?: string;
      sdsStreamId: string;
      searchParameters: ISdsSearchParameters;
    }
  ) {
    const searchParameterHash: string = hashSearchParameters(searchParameters);
    const maybeSdsStreamData: any = (state.sdsStreamDataDictionary[
      sdsStreamId
    ] || {})[searchParameterHash];

    if (typeof maybeSdsStreamData === "undefined") {
      return dispatch("getSdsStreamData", {
        projectId,
        shareId,
        sdsStreamId,
        searchParameters,
      });
    } else {
      return Promise.resolve(maybeSdsStreamData);
    }
  },
  async getSdsStreamData(
    { commit, rootGetters, dispatch },
    {
      projectId,
      shareId,
      sdsStreamId,
      searchParameters,
    }: {
      projectId?: number;
      shareId?: string;
      sdsStreamId: string;
      searchParameters: ISdsSearchParameters;
    }
  ) {
    commit("getSdsStreamData");

    const sdsStream: ISdsStream = rootGetters["sdsStreams/getSdsStreamById"]({
      projectId,
      shareId,
      sdsStreamId,
    });
    const sdsTypes: ISdsType[] = await dispatch(
      "sdsTypes/getSdsTypesWithCache",
      {
        projectId,
      },
      { root: true }
    );
    const sdsType: ISdsType | undefined = sdsTypes.find(
      (sdsType: ISdsType) => sdsType.Id === sdsStream.TypeId
    );

    const temporal: boolean = sdsType
      ? !!(
          // eslint-disable-next-line
          (
          // @ts-ignore
            sdsType!.Properties.find((item: any) => item.IsKey)!.SdsType!
              .SdsTypeCode === 16
          )
        )
      : true;

    try {
      const { count, useCount, startIndex, endIndex, period, usePeriod } =
        searchParameters;

      let fixedStartIndex: string = startIndex;
      let fixedEndIndex: string = endIndex;

      if (!temporal) {
        fixedStartIndex = "1";
        fixedEndIndex = count.toString();
      } else if (usePeriod) {
        const searchPeriod = getSdsSearchIndexByPeriod(period);
        fixedStartIndex = searchPeriod.startIndex;
        fixedEndIndex = searchPeriod.endIndex;
      }

      const endpoint: string = getStreamDataEndpoint({
        streamId: sdsStreamId,
        projectId,
        startIndex: fixedStartIndex,
        endIndex: useCount ? undefined : fixedEndIndex,
        count: useCount ? count : undefined,
      });
      const sdsStreamData: any = await axios.get(endpoint);

      commit("getSdsStreamDataSuccess", {
        sdsStreamId,
        searchParameters,
        sdsStreamData,
      });

      return sdsStreamData;
    } catch (error) {
      console.error(error);
      commit("getSdsStreamDataError");

      return undefined;
    }
  },
  async getCommunitySdsStreamDataWithCache(
    { state, dispatch },
    {
      communityId,
      sdsStreamId,
      searchParameters,
    }: {
      communityId: number;
      sdsStreamId: string;
      searchParameters: ISdsSearchParameters;
    }
  ) {
    const searchParameterHash: string = hashSearchParameters(searchParameters);
    const maybeSdsStreamData: any = (state.sdsStreamDataDictionary[
      sdsStreamId
    ] || {})[searchParameterHash];

    if (typeof maybeSdsStreamData === "undefined") {
      return dispatch("getCommunitySdsStreamData", {
        communityId,
        sdsStreamId,
        searchParameters,
      });
    } else {
      return Promise.resolve(maybeSdsStreamData);
    }
  },
  async getCommunitySdsStreamData(
    { commit, rootGetters, dispatch },
    {
      communityId,
      sdsStreamId,
      searchParameters,
    }: {
      communityId: number;
      sdsStreamId: string;
      searchParameters: ISdsSearchParameters;
    }
  ) {
    commit("getSdsStreamData");

    const { startIndex, endIndex, count, useCount } = searchParameters;

    try {
      const endpoint = `/communities/axt/${communityId}/streams/${sdsStreamId}/data`;
      const response: IAPIResponse = await axios.get(endpoint, {
        params: {
          startIndex,
          endIndex: useCount ? undefined : endIndex,
          count: useCount ? count : undefined,
        },
      });

      if (response.status === APIResponseStatus.SUCCESS) {
        const sdsStreamData: any = response.data.data;

        commit("getSdsStreamDataSuccess", {
          sdsStreamId,
          searchParameters,
          sdsStreamData,
        });

        return sdsStreamData;
      } else {
        console.error(`Response from server: ${response.message}`);
        commit("getSdsStreamDataError");
        return undefined;
      }
    } catch (error) {
      console.error(error);
      commit("getSdsStreamDataError");
      return undefined;
    }
  },
  getSharingSdsStreamDataWithCache(
    { state, dispatch },
    {
      assetId,
      sdsStreamId,
      searchParameters,
    }: {
      assetId: number;
      sdsStreamId: string;
      searchParameters: ISdsSearchParameters;
    }
  ) {
    const searchParameterHash: string = hashSearchParameters(searchParameters);
    const maybeSdsStreamData: any = (state.sdsStreamDataDictionary[
      sdsStreamId
    ] || {})[searchParameterHash];

    if (typeof maybeSdsStreamData === "undefined") {
      return dispatch("getSharingSdsStreamData", {
        assetId,
        sdsStreamId,
        searchParameters,
      });
    } else {
      return Promise.resolve(maybeSdsStreamData);
    }
  },
  async getSharingSdsStreamData(
    { commit, rootGetters, dispatch },
    {
      assetId,
      sdsStreamId,
      searchParameters,
    }: {
      assetId: number;
      sdsStreamId: string;
      searchParameters: ISdsSearchParameters;
    }
  ) {
    commit("getSdsStreamData");

    const { startIndex, endIndex, count, useCount } = searchParameters;

    try {
      const endpoint = `/sharing/assets/${assetId}/streams/${sdsStreamId}/data`;
      const response: IAPIResponse = await axios.get(endpoint, {
        params: {
          startIndex,
          endIndex: useCount ? undefined : endIndex,
          count: useCount ? count : undefined,
        },
      });

      if (response.status === APIResponseStatus.SUCCESS) {
        const sdsStreamData: any = response.data.data;

        commit("getSdsStreamDataSuccess", {
          sdsStreamId,
          searchParameters,
          sdsStreamData,
        });

        return sdsStreamData;
      } else {
        console.error(`Response from server: ${response.message}`);
        commit("getSdsStreamDataError");
        return undefined;
      }
    } catch (error) {
      console.error(error);
      commit("getSdsStreamDataError");
      return undefined;
    }
  },
};

const mutations: MutationTree<ISdsStreamState> = {
  getSdsStreamData(state, _) {
    state.isFetchingSdsStreamData = true;
  },
  getSdsStreamDataError(state, _) {
    state.isFetchingSdsStreamData = false;
  },
  getSdsStreamDataSuccess(
    state,
    { sdsStreamId, searchParameters, sdsStreamData }
  ) {
    const searchParameterHash: string = hashSearchParameters(searchParameters);

    state.isFetchingSdsStreamData = false;
    state.sdsStreamDataDictionary = {
      ...state.sdsStreamDataDictionary,
      [sdsStreamId]: {
        ...(state.sdsStreamDataDictionary[sdsStreamId] || {}),
        [searchParameterHash]: sdsStreamData,
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

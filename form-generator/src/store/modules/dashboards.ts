import axios from "axios";
import { ActionTree, GetterTree, MutationTree } from "vuex";

import { IRootState } from "../index";
import { IAPIResponse, APIResponseStatus, ICustomer } from "@/models";
import { IDashboard } from "@/shared/models";
import { handleServerError } from "@/services";

export interface IDashboardsState {
  dashboards: IDashboard[] | undefined;
  isFetchingDashboards: boolean;
  isUpdatingDashboard: boolean;
}

const defaultState: IDashboardsState = {
  dashboards: undefined,
  isFetchingDashboards: false,
  isUpdatingDashboard: false,
};

const getters: GetterTree<IDashboardsState, IRootState> = {
  dashboards: (state) => () => state.dashboards,
};

const actions: ActionTree<IDashboardsState, IRootState> = {
  async getDashboardsWithCache(
    { state, dispatch },
    {
      customer,
    }: {
      customer: ICustomer;
    }
  ) {
    const maybeDashboards: IDashboard[] | undefined = state.dashboards;

    if (typeof maybeDashboards === "undefined") {
      return dispatch("getDashboards", { customer });
    } else {
      return Promise.resolve(maybeDashboards as IDashboard[]);
    }
  },
  async getDashboards(
    { commit },
    {
      customer,
    }: {
      customer: ICustomer;
    }
  ) {
    commit("getDashboards");

    try {
      const response: IAPIResponse = await axios.get(
        `/orgs/${customer.id}/dashboards?published=true`
      );

      if (response.status === APIResponseStatus.SUCCESS) {
        const dashboards: IDashboard[] = response.data.dashboards;

        commit("getDashboardsSuccess", dashboards);

        return dashboards;
      } else {
        throw new Error();
        return;
      }
    } catch (error) {
      commit("getDashboardsError");
      handleServerError(error);
      return;
    }
  },
  async updateDashboard(
    { commit, rootGetters },
    {
      dashboard,
    }: {
      dashboard: IDashboard;
    }
  ) {
    commit("updateDashboard");

    const customer: ICustomer = rootGetters["customer/getCustomer"]();

    try {
      const endpoint = `/customers/${customer.id}/dashboards/${dashboard.id}`;
      const response: IAPIResponse = await axios.put(endpoint, dashboard);

      if (response.status === APIResponseStatus.SUCCESS) {
        const updatedDashboard: IDashboard = response.data.dashboard;

        commit("updateDashboardSuccess", {
          dashboard: updatedDashboard,
        });

        return updatedDashboard;
      } else {
        throw new Error();
        return;
      }
    } catch (error) {
      commit("updateDashboardError");
      handleServerError(error);
      return;
    }
  },
};

const mutations: MutationTree<IDashboardsState> = {
  getDashboards(state, _) {
    state.isFetchingDashboards = true;
  },
  getDashboardsError(state, _) {
    state.isFetchingDashboards = false;
  },
  getDashboardsSuccess(state, dashboards: IDashboard[]) {
    state.isFetchingDashboards = false;
    state.dashboards = dashboards;
  },
  updateDashboard(state) {
    state.isUpdatingDashboard = true;
  },
  updateDashboardError(state) {
    state.isUpdatingDashboard = false;
  },
  updateDashboardSuccess(
    state,
    {
      dashboard,
    }: {
      dashboard: IDashboard;
    }
  ) {
    state.isUpdatingDashboard = false;
    state.dashboards = (state.dashboards || []).map((item: IDashboard) => {
      if (item.id === dashboard.id) {
        return dashboard;
      } else {
        return item;
      }
    });
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};

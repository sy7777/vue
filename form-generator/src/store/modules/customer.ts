import axios from "axios";
import { ActionTree, GetterTree, MutationTree } from "vuex";

import { IRootState } from "../index";
import { IAPIResponse, APIResponseStatus, ICustomer } from "@/models";
import { handleServerError } from "@/services";

export interface ICustomerState {
  customer: ICustomer | undefined;
  isFetchingCustomer: boolean;
}

const defaultState: ICustomerState = {
  customer: undefined,
  isFetchingCustomer: false,
};

const getters: GetterTree<ICustomerState, IRootState> = {
  getCustomer: (state) => () => state.customer,
};

const actions: ActionTree<ICustomerState, IRootState> = {
  async getCustomerWithCache({ state, dispatch }) {
    const maybeCustomer: ICustomer | undefined = state.customer;

    if (typeof maybeCustomer === "undefined") {
      return dispatch("getCustomer");
    } else {
      return Promise.resolve(maybeCustomer as ICustomer);
    }
  },
  async getCustomer({ commit }) {
    commit("getCustomer");

    try {
      // API uses subdomain from origin header to get customer details
      // ensure local DNS server is set up if testing locally
      const response: IAPIResponse = await axios.get("customers");

      if (response.status === APIResponseStatus.SUCCESS) {
        const customer: ICustomer = response.data.customers[0];

        commit("getCustomerSuccess", {
          customer,
        });

        return customer;
      } else {
        throw new Error();
        return;
      }
    } catch (error) {
      commit("getCustomerError");
      handleServerError(error);
      return;
    }
  },
};

const mutations: MutationTree<ICustomerState> = {
  getCustomer(state) {
    state.isFetchingCustomer = true;
  },
  getCustomerError(state) {
    state.isFetchingCustomer = false;
  },
  getCustomerSuccess(
    state,
    {
      customer,
    }: {
      customer: ICustomer;
    }
  ) {
    state.isFetchingCustomer = false;
    state.customer = customer;
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};

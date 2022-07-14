import { IItem } from "@/models";
import { ActionTree, createStore, GetterTree, MutationTree } from "vuex";
export interface ItemFilter {
  name: FilterType;
  value: any;
}
export interface IItemListState {
  itemList: IItem[];
  filters: ItemFilter[];
}
export enum FilterType {
  FINISH_STATUS = "finished",
}
const defaultState: IItemListState = {
  itemList: [],
  filters: [],
};
// getters
const getters: GetterTree<IItemListState, IItemListState> = {
  itemList: (state) => {
    const filteredList = state.itemList.filter((item) => {
      let filtered = true;
      for (const filter of state.filters) {
        switch (filter.name) {
          case FilterType.FINISH_STATUS:
            filtered = item.isTicked === (filter.value === "true");
            break;
          default:
            break;
        }
        if (!filter) {
          break;
        }
      }
      return filtered;
    });
    return filteredList;
  },
  doneList:(state) => {
    return state.itemList.filter(item=>item.isTicked)
  }
};
// mutations
const mutations: MutationTree<IItemListState> = {
  addItem(state, itemObj: IItem) {
    state.itemList.push(itemObj);
  },
  delteItem(state, id: string) {
    state.itemList = state.itemList.filter((item) => {
      return item.id !== id;
    });
  },
  setItemTicked(state, id: string) {
    state.itemList.forEach((item) => {
      if (item.id === id) {
        item.isTicked = !item.isTicked;
      }
    });
  },
  updateItemInVuex(state, itemObj: IItem) {
    state.itemList.forEach((item) => {
      if (item.id === itemObj.id) {
        item.name = itemObj.name;
        item.dueDate = itemObj.dueDate;
      }
    });
  },
  addFilter(state, filter: ItemFilter) {
    const existing = state.filters.find((f) => f.name === filter.name);
    existing ? (existing.value = filter.value) : state.filters.push(filter);
  },
  removeFilter(state, type: FilterType) {
    state.filters = state.filters.filter((f) => f.name !== type);
  },
};
// actions
const actions: ActionTree<IItemListState, IItemListState> = {};

export default createStore({
  state: defaultState,
  getters,
  mutations,
});

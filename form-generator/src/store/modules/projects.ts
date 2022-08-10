import axios from "axios";
import { ActionTree, GetterTree, MutationTree } from "vuex";

import { IRootState } from "../index";
import { IProject, IAPIResponse, APIResponseStatus } from "@/models";

export interface IProjectsState {
  projects: IProject[] | undefined;
  isFetchingProjects: boolean;
  isUpdatingProject: boolean;
}

const defaultState: IProjectsState = {
  projects: undefined,
  isFetchingProjects: false,
  isUpdatingProject: false,
};

const getters: GetterTree<IProjectsState, IRootState> = {
  getProjects: (state) => (): IProject[] | undefined => {
    return state.projects;
  },
  getProjectById:
    (state) =>
    ({ projectId }: any): IProject | undefined => {
      return (state.projects || []).find(
        (item: IProject) => item.id === projectId
      );
    },
};

const actions: ActionTree<IProjectsState, IRootState> = {
  async getProjectsWithCache({ state, dispatch }, _) {
    if (typeof state.projects === "undefined") {
      return dispatch("getProjects");
    } else {
      return Promise.resolve(state.projects);
    }
  },
  async getProjects({ commit }, _) {
    commit("getProjects");

    try {
      const response: IAPIResponse = await axios.get(
        "/projects/search-by-name"
      );
      if (response.status === APIResponseStatus.SUCCESS) {
        const projects: IProject[] = response.data.projects;

        commit("getProjectsSuccess", projects);

        return projects;
      } else {
        console.error(`Response from server: ${response.message}`);
        commit("getProjectsError");
        return undefined;
      }
    } catch (error) {
      console.error(error);
      commit("getProjectsError");

      return undefined;
    }
  },
  async updateProject(
    { commit },
    {
      project,
    }: {
      project: IProject;
    }
  ) {
    commit("updateProject");

    try {
      const response: IAPIResponse = await axios.put(
        `/projects/${project.id}`,
        project
      );

      if (response.status === APIResponseStatus.SUCCESS) {
        const updatedProject: IProject = response.data.project;

        commit("updateProjectSuccess", updatedProject);

        return updatedProject;
      } else {
        console.error(`Response from server: ${response.message}`);
        commit("updateProjectError");
        return undefined;
      }
    } catch (error) {
      console.error(error);
      commit("updateProjectError");
      return undefined;
    }
  },
};

const mutations: MutationTree<IProjectsState> = {
  getProjects(state, _) {
    state.isFetchingProjects = true;
  },
  getProjectsError(state, _) {
    state.isFetchingProjects = false;
  },
  getProjectsSuccess(state, projects: IProject[]) {
    state.isFetchingProjects = false;
    state.projects = projects;
  },
  updateProject(state, _) {
    state.isUpdatingProject = true;
  },
  updateProjectError(state, _) {
    state.isUpdatingProject = false;
  },
  updateProjectSuccess(state, updatedProject) {
    state.isUpdatingProject = false;
    state.projects = (state.projects || []).map((project: IProject) => {
      if (project.id === updatedProject.id) {
        return updatedProject;
      } else {
        return project;
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

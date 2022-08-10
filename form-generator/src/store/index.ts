import { createStore } from "vuex";

import auth, { IAuthState } from "./modules/auth";
import organisation, { IOrgState } from "./modules/organisation";
import projectData, { IProjectDataState } from "./modules/projectData";
import asset, { IAssetState } from "./modules/asset";
import sdsType, { ISdsTypeState } from "./modules/sdsType";
import sdsTypes, { ISdsTypesState } from "./modules/sdsTypes";
import sdsStream, { ISdsStreamState } from "./modules/sdsStream";
import sdsStreams, { ISdsStreamsState } from "./modules/sdsStreams";
import projects, { IProjectsState } from "./modules/projects";
import organisations, { IOrgsState } from "./modules/organisations";
import exchange, { IExchangeState } from "./modules/exchange";
import organisationMembers, {
  IOrganisationMembersState,
} from "./modules/organisationMembers";
import roles, { IRolesState } from "./modules/roles";
import user, { IUserState } from "./modules/user";
import dashboards, { IDashboardsState } from "./modules/dashboards";
import customer, { ICustomerState } from "./modules/customer";

export interface IRootState {
  AuthState: IAuthState;
  ProjectDataState: IProjectDataState;
  OrgState: IOrgState;
  AssetState: IAssetState;
  SdsTypeState: ISdsTypeState;
  SdsTypesState: ISdsTypesState;
  SdsStreamState: ISdsStreamState;
  SdsStreamsState: ISdsStreamsState;
  ProjectsState: IProjectsState;
  OrganisationsState: IOrgsState;
  ExchangeState: IExchangeState;
  OrganisationMembersState: IOrganisationMembersState;
  RolesState: IRootState;
  UserState: IUserState;
  DashboardsState: IDashboardsState;
  CustomerState: ICustomerState;
}

export default createStore({
  modules: {
    auth,
    projectData,
    organisation,
    asset,
    sdsType,
    sdsTypes,
    sdsStream,
    sdsStreams,
    projects,
    organisations,
    exchange,
    organisationMembers,
    roles,
    user,
    dashboards,
    customer,
  },
});

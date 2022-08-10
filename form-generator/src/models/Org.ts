export interface IOrgMember {
  id: number;
  name: string;
  email: string;
}

export interface IOrg {
  id: number;
  name: string;
}

export interface ICreateOrgData {
  name: string;
}

export interface IRequestMemberData {
  email: string;
  role_id: number;
}

export interface ISearchOrganisation {
  name: string;
}

export interface IOrgDictionary {
  [organisationId: number]: IOrg;
}

export interface IOrgMemberDictionary {
  [organisationId: number]: IOrgMember[];
}

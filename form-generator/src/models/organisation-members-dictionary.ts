import { IOrganisationMember } from "./organisation-member";

export interface IOrganisationMembersDictionary {
  [id: number]: IOrganisationMember[];
}

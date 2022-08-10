import { IInvitation } from "@/models";

export interface IOrganisationInvitationsDictionary {
  [organisationId: number]: IInvitation[];
}

import { IRole, IUser } from "@/models";

export interface IOrganisationMember {
  user: IUser;
  role: IRole;
}

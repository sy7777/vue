import { IRole } from "@/models";

export interface IInvitation {
  id: number;
  email: string;
  role: IRole;
}

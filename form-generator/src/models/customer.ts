import { IRole } from "./role";

export interface ICustomer {
  id: number;
  name: string;
  role: IRole | undefined;
}

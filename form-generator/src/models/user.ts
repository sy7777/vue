export interface IUser {
  id: number;
  email: string;
  name: string;
  emailVerified: boolean;
  phone: string;
  phoneVerified: boolean;
  staff: boolean;
  staffAdmin: boolean;
}

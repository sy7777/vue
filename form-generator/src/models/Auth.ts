// Response data
import { IOrg } from "@/models/Org";

export interface IAuthLoginUrlData {
  redirect_url: string;
}

export interface IAuthResponseData {
  access_token: string;
}

// Request Login Data
export interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginOAuthData {
  code: string;
  session: string;
  session_state: string;
}

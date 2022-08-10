export enum APIResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
}

export interface IAPIResponse {
  status: APIResponseStatus;
  data: any;
  message: string | undefined;
}

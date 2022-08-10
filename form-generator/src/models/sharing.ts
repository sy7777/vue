import { IAsset } from "@/shared/models";

export interface ITokenAssetDictionary {
  [token: string]: IAsset;
}

import { IAlgorithm } from "@/models";

export interface IAsset {
  id: number;
  projectId: number;
  name: string;
  streams: IAssetStream[];
  algorithms: IAlgorithm[];
  sharingTokens: IAssetSharingToken[];
}

export interface IAssetStream {
  id?: any;
  streamId: string;
  searchParameters: any;
  properties: any[];
}

export interface IAssetSharingToken {
  id?: any;
  token: string;
  name: string;
  enabled: boolean;
  communityEnabled: boolean;
  exchangeEnabled: boolean;
  expiry: string;
}

export interface IAssetDictionary {
  [projectId: number]: IAsset[];
}

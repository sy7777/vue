import { IAssetStream } from "@/shared/models";

export interface ICommunityToken {
  id: any;
  token: string;
  name: string;
  enabled: boolean;
  expiry: string;
  assetStreams: IAssetStream[];
}

export interface ICommunity {
  id: number;
  name: string;
  tokens: ICommunityToken[];
  createdAt: string;
  updatedAt: string;
}

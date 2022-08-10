import { ISdsStream } from "./SdsStream";

export interface ISharingStreamsDictionary {
  [assetId: number]: ISdsStream[];
}

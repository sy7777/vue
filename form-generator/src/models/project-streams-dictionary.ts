import { ISdsStream } from "./SdsStream";

export interface IProjectStreamsDictionary {
  [projectId: number]: ISdsStream[];
}

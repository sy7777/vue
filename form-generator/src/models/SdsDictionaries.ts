import { ISdsStream } from "./SdsStream";

export interface ISdsTypeStreamDataDictionary {
  [sdsTypeId: string]: {
    [searchParameterHash: string]: any[];
  };
}

export interface ISdsTypeStreamsDictionary {
  [sdsTypeId: string]: ISdsStream[];
}

export interface IProjectStreamDataDictionary {
  [projectId: number]: {
    [searchParameterHash: string]: any[];
  };
}

export interface ISharingStreamDataDictionary {
  [shareId: string]: {
    [searchParameterHash: string]: any[];
  };
}

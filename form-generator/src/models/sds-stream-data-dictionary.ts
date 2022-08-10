export interface ISdsStreamDataDictionary {
  [sdsStreamId: string]: {
    [searchParameterHash: string]: any[];
  };
}

import { IOcsType, IOcsTypeProperty } from "./OcsType";

export interface IOcsStream {
  Id: string;
  TypeId: string;
  Name: string;
  Description: string;
}

export interface IOcsStreamDictionary {
  [projectId: number]: IOcsStream[];
}

export interface IOcsStreamDataDictionary {
  [streamId: string]: any[];
}

export interface IOcsStreamSearchParameters {
  startIndex: string;
  endIndex: string;
  useCount: boolean;
  count: number;
  temporal: boolean;
}

export interface IOcsStreamProperty extends IOcsTypeProperty {
  active: boolean;
}

export interface IOcsStreamProperties {
  [propertyName: string]: IOcsStreamProperty;
}

export interface IOcsStreamTypeDictionary {
  [streamId: string]: any;
}

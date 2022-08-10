export interface IOcsTypeSdsType {
  Id: string;
  Name: string;
  Description: string;
  SdsTypeCode: number;
}

export interface IOcsTypeProperty {
  Id: string;
  Name: string;
  Description: string;
  IsKey: boolean;
  SdsType: IOcsTypeSdsType;
}

export interface IOcsType {
  Id: string;
  Name: string;
  Description: string;
  SdsTypeCode: number;
  Properties: IOcsTypeProperty[];
}

export interface IOcsTypeDictionary {
  [projectId: number]: IOcsType[];
}

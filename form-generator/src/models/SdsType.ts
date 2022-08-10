export interface ISdsTypeProperty {
  Id: string;
  Name: string;
  Description: string;
  IsKey: boolean;
  active?: boolean;
}

export interface ISdsType {
  Id: string;
  Name: string;
  Description: string;
  SdsTypeCode?: number;
  Properties: ISdsTypeProperty[];
}

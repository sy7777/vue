export interface FieldDetail {
  type: FieldType;
  name: string;
  icon: string;
}

export enum FieldType {
  INPUT = "FormDesignInput",
  RADIO = "FormDesignRadio",
  CHECKBOX = "FormDesignCheckbox",
  TEXTAREA = "FormDesignTextarea",
  NUMBER = "FormDesignNumber",
  TABLE = "FormDesignTable",
  TEXT = "FormDesignText",
}
export interface FormControlJsonSchema {
  id: string;
  type: FieldType;
  name: string;
  title: string;
  placeholder?: string;
  options?: FormOptionSchema[];
  required: boolean;
  trs?: TableRow[];
}
interface FormOptionSchema {
  value: string;
  name: string;
}
export interface FormJsonSchema {
  id?: string;
  controls: FormControlJsonSchema[];
  // title: string;
  // layout: string;
  category: string;
}
export interface TableRow {
  tds: TableColumn[];
}
export interface TableColumn {
  colspan: number;
  rowspan: number;
}
export interface TableCell {
  tableId: string;
  trIndex: number;
  tdIndex: number;
}

export enum ClickMenuOptions {
  RIGHT = "Merge to the right",
  BOTTOM = "Merge to the bottom",
  TYPE = "divider",
  ADD_ROW = "add row",
  ADD_COLUMN = "add column",
}
// export interface Menu

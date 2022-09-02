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
  title?: string;
  placeholder?: string;
  options?: FormOptionSchema[];
  required: boolean;
  trs?: TableRow[];
}
interface FormOptionSchema {
  value: string;
  name?: string;
}
export interface FormJsonSchema {
  id?: string;
  controls: FormControlJsonSchema[];
  category: string;
}
export interface TableRow {
  tds: TableColumn[];
}
export interface TableColumn {
  colspan: number;
  rowspan: number;
  content:  FormControlJsonSchema;
}
export interface TableCell {
  tableId: string;
  trIndex: number;
  tdIndex: number;
}

export enum ClickMenuOptions {
  RIGHT = "Merge cells right",
  BOTTOM = "Merge cells down",
  CONFIGURE = "Configure cell content",
  ADD_ROW = "add row down",
  ADD_COLUMN = "add column right",
}
// export interface Menu

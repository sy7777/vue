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
}
export interface FormJsonSchema {
  id: string;
  type: FieldType;
  name: string;
  title: string;
  options?: FormOptionSchema[];
  required: boolean;
}
interface FormOptionSchema {
  value: string;
}

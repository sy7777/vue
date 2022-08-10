export interface IItem {
    id: string;
    isTicked: boolean;
    name: string;
    isEdit: boolean;
    isDel: boolean;
    createdTime: Date;
    dueDate: Date;
}

export interface IData{
    name?: string;
    time?: string;
    date?: string;
  }
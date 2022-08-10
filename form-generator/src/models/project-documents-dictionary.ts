import { IDocument } from "./Document";

export interface IProjectDocumentsDictionary {
  [projectId: number]: IDocument[];
}

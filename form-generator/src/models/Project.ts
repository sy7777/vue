export interface IOcsNamespace {
  id: number;
  name: string;
}

export interface IAxisflowProject {
  id: number;
  name: string;
}

export interface IProject {
  id: number;
  name: string;
  description: string;
  latitude: any;
  longitude: any;
  axisflowProject: IAxisflowProject;
  ocsNamespace: IOcsNamespace;
  org_id: number;
  logo: string | null;
}

export interface IGetProjectData {
  id: number;
}

export interface ISearchProject {
  name: string;
}

export interface IProjectDictionary {
  [projectId: number]: IProject;
}

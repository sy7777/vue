export interface IRecording {
  id: string;
  name: string;
  url: string;
}

export interface IProjectRecordingsDictionary {
  [projectId: number]: IRecording[];
}

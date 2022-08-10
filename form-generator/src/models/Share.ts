export interface SharedResource {
  id: number;
  slug: string;
  created_at: string;
  updated_at: string;
  project_id: number;
  user_id: number;
  resources: string[];
  name: string;
  type: string;
}

export interface SharedStreamsDictionary {
  [projectId: number]: SharedResource[];
}

export interface IOcsUsage {
  ClusterRegion: string;
  Date: string;
  EgressEvents: number;
  EgressStreamsAccessed: number;
  IngressEvents: number;
  IngressStreamsAccessed: number;
  NamespaceId: string;
  TenantId: string;
}

export interface IResourceUsageDictionary {
  [projectId: number]: IOcsUsage[];
}

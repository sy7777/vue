export interface ICommunityStream {
  CommunityId: string;
  Description: string;
  Id: string;
  Name: string;
  NamespaceId: string;
  Self: string;
  TenantId: string;
  TypeId: string;
}

export interface ICommunityStreamsDictionary {
  [communityId: string]: ICommunityStream[];
}

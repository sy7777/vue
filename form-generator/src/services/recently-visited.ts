import {
  RECENTLY_VISITED_ASSETS,
  RECENTLY_VISITED_DASHBOARDS,
  RECENTLY_VISITED_DOCUMENTS,
  RECENTLY_VISITED_PROJECTS,
  RECENTLY_VISITED_STREAMS,
  RECENTLY_VISITED_DEVICES,
} from "@/constants";
import { IProject, ISdsStream, IDocument, IDevice } from "@/models";
import { IAsset, IDashboard } from "@/shared/models";

const parseItem = (key: string): any => {
  const maybeCacheItem: any = localStorage.getItem(key);

  try {
    return JSON.parse(maybeCacheItem);
  } catch (error) {
    return undefined;
  }
};

export const getRecentlyVisitedDevices = (
  projectId: number,
  devices: IDevice[]
): IDevice[] => {
  const recentlyVisited: any = parseItem(RECENTLY_VISITED_DEVICES) || {};
  const deviceIds: number[] = recentlyVisited[projectId] || [];

  return deviceIds
    .map((id: number) => devices.find((item: IDevice) => item.id === id))
    .filter((item: IDevice | undefined) => item) as IDevice[];
};

export const updateRecentlyVisitedDevices = (
  projectId: number,
  deviceId: number
): void => {
  const recentlyVisited: any = parseItem(RECENTLY_VISITED_DEVICES) || {};
  const filtered: number[] = (recentlyVisited[projectId] || []).filter(
    (item: number) => item !== deviceId
  );
  const newRecentlyVisited: any = {
    ...recentlyVisited,
    [projectId]: [deviceId].concat(filtered).slice(0, 10),
  };

  localStorage.setItem(
    RECENTLY_VISITED_DEVICES,
    JSON.stringify(newRecentlyVisited)
  );
};

export const getRecentlyVisitedDocuments = (
  projectId: number,
  documents: IDocument[]
): IDocument[] => {
  const recentlyVisited: any = parseItem(RECENTLY_VISITED_DOCUMENTS) || {};
  const documentIds: number[] = recentlyVisited[projectId] || [];

  return documentIds
    .map((id: number) => documents.find((item: IDocument) => item.id === id))
    .filter((item: IDocument | undefined) => item) as IDocument[];
};

export const updateRecentlyVisitedDocuments = (
  projectId: number,
  documentId: number
): void => {
  const recentlyVisited: any = parseItem(RECENTLY_VISITED_DOCUMENTS) || {};
  const filtered: number[] = (recentlyVisited[projectId] || []).filter(
    (item: number) => item !== documentId
  );
  const newRecentlyVisited: any = {
    ...recentlyVisited,
    [projectId]: [documentId].concat(filtered).slice(0, 10),
  };

  localStorage.setItem(
    RECENTLY_VISITED_DOCUMENTS,
    JSON.stringify(newRecentlyVisited)
  );
};

export const getRecentlyVisitedDashboards = (
  projectId: number,
  dashboards: IDashboard[]
): IDashboard[] => {
  const recentlyVisited: any = parseItem(RECENTLY_VISITED_DASHBOARDS) || {};
  const dashboardIds: number[] = recentlyVisited[projectId] || [];

  return dashboardIds
    .map((id: number) => dashboards.find((item: IDashboard) => item.id === id))
    .filter((x: IDashboard | undefined) => x) as IDashboard[];
};

export const updateRecentlyVisitedDashboards = (
  projectId: number,
  dashboardId: number
): void => {
  const recentlyVisited: any = parseItem(RECENTLY_VISITED_DASHBOARDS) || {};
  const filtered: number[] = (recentlyVisited[projectId] || []).filter(
    (item: number) => item !== dashboardId
  );
  const newRecentlyVisited: any = {
    ...recentlyVisited,
    [projectId]: [dashboardId].concat(filtered).slice(0, 10),
  };

  localStorage.setItem(
    RECENTLY_VISITED_DASHBOARDS,
    JSON.stringify(newRecentlyVisited)
  );
};

export const getRecentlyVisitedStreams = (
  projectId: number,
  sdsStreams: ISdsStream[]
): ISdsStream[] => {
  const recentlyVisited: any = parseItem(RECENTLY_VISITED_STREAMS) || {};
  const streamIds: string[] = recentlyVisited[projectId] || [];

  return streamIds
    .map((id: string) => sdsStreams.find((item: ISdsStream) => item.Id === id))
    .filter((x: any) => x) as ISdsStream[];
};

export const updateRecentlyVisitedStreams = (
  projectId: number,
  streamId: number
): void => {
  const recentlyVisited: any = parseItem(RECENTLY_VISITED_STREAMS) || {};
  const filtered: number[] = (recentlyVisited[projectId] || []).filter(
    (item: number) => item !== streamId
  );

  const newRecentlyVisited: any = {
    ...recentlyVisited,
    [projectId]: [streamId].concat(filtered).slice(0, 10),
  };

  localStorage.setItem(
    RECENTLY_VISITED_STREAMS,
    JSON.stringify(newRecentlyVisited)
  );
};

export const getRecentlyVisitedAssets = (
  projectId: number,
  assets: IAsset[]
): IAsset[] => {
  const recentlyVisited: any = parseItem(RECENTLY_VISITED_ASSETS) || {};
  const assetIds = recentlyVisited[projectId] || [];

  return assetIds
    .map((id: number) => assets.find((item: IAsset) => item.id === id))
    .filter((x: any) => x);
};

export const updateRecentlyVisitedAssets = (
  projectId: number,
  assetId: number
): void => {
  const recentlyVisited: any = parseItem(RECENTLY_VISITED_ASSETS) || {};
  const filtered: number[] = (recentlyVisited[projectId] || []).filter(
    (item: number) => item !== assetId
  );

  const newRecentlyVisited: any = {
    ...recentlyVisited,
    [projectId]: [assetId].concat(filtered).slice(0, 10),
  };

  localStorage.setItem(
    RECENTLY_VISITED_ASSETS,
    JSON.stringify(newRecentlyVisited)
  );
};

export const getRecentlyVisitedProjects = (
  projects: IProject[]
): IProject[] => {
  const projectIds: number[] = parseItem(RECENTLY_VISITED_PROJECTS) || [];

  return projectIds
    .map((id: number) => projects.find((item: IProject) => item.id === id))
    .filter((x: any) => x) as IProject[];
};

export const updateRecentlyVisitedProjects = (projectId: number): void => {
  const projectIds: number[] = parseItem(RECENTLY_VISITED_PROJECTS) || [];
  const filtered: number[] = projectIds.filter(
    (item: number) => item !== projectId
  );

  const newRecentlyVisited: number[] = [projectId].concat(filtered).slice(0, 3);

  localStorage.setItem(
    RECENTLY_VISITED_PROJECTS,
    JSON.stringify(newRecentlyVisited)
  );
};

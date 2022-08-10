import AppConfig from "@/constants/app";
import dayjs from "dayjs";
import {
  IOcsStreamSearchParameters,
  IOcsType,
  IOcsTypeProperty,
} from "@/models";

export const constructEmbeddedStreamUrl = ({
  streamId,
  projectId,
  attributes,
  table = false,
  sharingToken,
  searchParameters,
  map3d,
  animatedLine,
  vectorContour,
  heat,
  cameraPath,
}: {
  streamId: string;
  projectId: number;
  attributes: string[];
  table?: boolean;
  sharingToken?: string;
  searchParameters: any;
  map3d?: boolean;
  animatedLine?: boolean;
  vectorContour?: boolean;
  heat?: boolean;
  cameraPath?: boolean;
}): string => {
  const attributesQuery = attributes.join(",");

  const params: any = {
    projectId,
    table,
    attributes: attributesQuery,
    r: sharingToken,
    ...searchParameters,
    map3d,
    animatedLine,
    vectorContour,
    heat,
    cameraPath,
  };

  const query = Object.keys(params)
    .filter((key: string) => typeof params[key] !== "undefined")
    .map(
      (key: string) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");

  return `${window.location.origin}/embed/streams/${streamId}?${query}`;
};

export const checkCoordinatesAvailable = (properties: any[]): boolean => {
  return properties.reduce(
    (acc: boolean, property: any) =>
      acc || (property.Id.toLowerCase() === "latitude" && property.active),
    false
  );
};

export const getStreamEndpoint = ({
  projectId,
  slug,
  streamId,
}: {
  projectId?: number;
  slug?: string;
  streamId: string;
}) => {
  // @ts-ignore
  const apiUrl: string = AppConfig.API_URL.toString();

  if (slug) {
    return `${apiUrl}/sharings/${slug}/streams/${streamId}`;
  } else {
    return `${apiUrl}/projects/${projectId}/streams/${streamId}`;
  }
};

export const getAllStreamData = ({
  projectId,
  shareId,
  searchParameters,
}: {
  projectId?: number;
  shareId?: string;
  searchParameters: IOcsStreamSearchParameters;
}) => {
  // @ts-ignore
  const apiUrl: string = AppConfig.API_URL.toString();

  const { startIndex, endIndex } = searchParameters;
  const query = `?startIndex=${startIndex}&endIndex=${endIndex}`;

  if (shareId) {
    return `${apiUrl}/sharings/${shareId}/types/streams/data${query}`;
  } else {
    return `${apiUrl}/projects/${projectId}/types/streams/data${query}`;
  }
};

export const getStreamDataByTypeEndpoint = ({
  projectId,
  shareId,
  typeId,
  searchParameters,
}: {
  projectId?: number;
  shareId?: string;
  typeId?: string;
  searchParameters: IOcsStreamSearchParameters;
}) => {
  // @ts-ignore
  const apiUrl: string = AppConfig.API_URL.toString();

  const { startIndex, endIndex, count, temporal } = searchParameters;

  const query = !temporal
    ? `?startIndex=1&endIndex=${count}`
    : `?startIndex=${startIndex}&endIndex=${endIndex}`;

  if (shareId) {
    return `${apiUrl}/sharings/${shareId}/types/${typeId}/streams/data${query}`;
  } else {
    return `${apiUrl}/projects/${projectId}/types/${typeId}/streams/data${query}`;
  }
};

export const getStreamDataEndpoint = ({
  streamId,
  projectId,
  slug,
  startIndex,
  endIndex,
  count,
}: {
  streamId: string;
  projectId?: number;
  slug?: string;
  startIndex?: string;
  endIndex?: string;
  count?: number;
}) => {
  // @ts-ignore
  const apiUrl: string = AppConfig.API_URL.toString();

  const params: any = {
    startIndex,
    endIndex,
    count,
  };

  const query = Object.keys(params)
    .filter((key: string) => !!params[key])
    .map(
      (key: string) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");

  if (slug) {
    return `${apiUrl}/sharings/${slug}/streams/${streamId}/data?${query}`;
  } else {
    return `${apiUrl}/projects/${projectId}/streams/${streamId}/data?${query}`;
  }
};

export const getStreamTypeEndpoint = ({
  streamId,
  projectId,
  slug,
}: {
  streamId: string;
  projectId?: number;
  slug?: string;
}) => {
  // @ts-ignore
  const apiUrl: string = AppConfig.API_URL.toString();

  if (slug) {
    return `${apiUrl}/sharings/${slug}/streams/${streamId}/type`;
  } else {
    return `${apiUrl}/projects/${projectId}/streams/${streamId}/type`;
  }
};

export const getStreamMetadataEndpoint = ({
  streamId,
  projectId,
  slug,
}: {
  streamId: string;
  projectId?: number;
  slug?: string;
}) => {
  // @ts-ignore
  const apiUrl: string = AppConfig.API_URL.toString();

  if (slug) {
    return `${apiUrl}/sharings/${slug}/streams/${streamId}/metadata`;
  } else {
    return `${apiUrl}/projects/${projectId}/streams/${streamId}/metadata`;
  }
};

export const getStreamsEndpoint = ({
  projectId,
  slug,
}: {
  projectId?: number;
  slug?: string;
}) => {
  // @ts-ignore
  const apiUrl: string = AppConfig.API_URL.toString();

  if (slug) {
    return `${apiUrl}/sharings/${slug}/streams`;
  } else {
    return `${apiUrl}/projects/${projectId}/streams`;
  }
};

export const getTypesEndpoint = ({
  projectId,
  slug,
}: {
  projectId?: number;
  slug?: string;
}) => {
  // @ts-ignore
  const apiUrl: string = AppConfig.API_URL.toString();

  if (slug) {
    return `${apiUrl}/sharings/${slug}/types`;
  } else {
    return `${apiUrl}/projects/${projectId}/types`;
  }
};

export const getStreamSummaryEndpoint = ({
  streamId,
  projectId,
  slug,
  startIndex,
  endIndex,
  count,
}: {
  streamId: string;
  projectId?: number;
  slug?: string;
  startIndex: string;
  endIndex: string;
  count: string;
}) => {
  // @ts-ignore
  const apiUrl: string = AppConfig.API_URL.toString();

  const query = `?startIndex=${startIndex}&endIndex=${endIndex}&count=${count}`;

  if (slug) {
    return `${apiUrl}/sharings/${slug}/streams/${streamId}/data/summaries${query}`;
  } else {
    return `${apiUrl}/projects/${projectId}/streams/${streamId}/data/summaries${query}`;
  }
};

export const randomStreamColour = (seed: string): any => {
  const colours = [
    {
      dark: true,
      hex: "#808080",
    },
    {
      dark: false,
      hex: "#c0c0c0",
    },
    {
      dark: true,
      hex: "#2f4f4f",
    },
    {
      dark: true,
      hex: "#556b2f",
    },
    {
      dark: true,
      hex: "#8b4513",
    },
    {
      dark: true,
      hex: "#a52a2a",
    },
    {
      dark: true,
      hex: "#191970",
    },
    {
      dark: true,
      hex: "#006400",
    },
    {
      dark: true,
      hex: "#808000",
    },
    {
      dark: false,
      hex: "#3cb371",
    },
    {
      dark: true,
      hex: "#008080",
    },
    {
      dark: true,
      hex: "#4682b4",
    },
    {
      dark: true,
      hex: "#000080",
    },
    {
      dark: true,
      hex: "#d2691e",
    },
    {
      dark: false,
      hex: "#9acd32",
    },
    {
      dark: false,
      hex: "#32cd32",
    },
    {
      dark: false,
      hex: "#daa520",
    },
    {
      dark: false,
      hex: "#8fbc8f",
    },
    {
      dark: true,
      hex: "#800080",
    },
    {
      dark: true,
      hex: "#b03060",
    },
    {
      dark: false,
      hex: "#d2b48c",
    },
    {
      dark: false,
      hex: "#48d1cc",
    },
    {
      dark: true,
      hex: "#9932cc",
    },
    {
      dark: true,
      hex: "#c44569",
    },
    {
      dark: false,
      hex: "#ff8c00",
    },
    {
      dark: false,
      hex: "#ffd700",
    },
    {
      dark: false,
      hex: "#ffff00",
    },
    {
      dark: true,
      hex: "#c71585",
    },
    {
      dark: true,
      hex: "#0000cd",
    },
    {
      dark: false,
      hex: "#00ff00",
    },
    {
      dark: false,
      hex: "#00fa9a",
    },
    {
      dark: true,
      hex: "#dc143c",
    },
    {
      dark: false,
      hex: "#00bfff",
    },
    {
      dark: false,
      hex: "#f4a460",
    },
    {
      dark: true,
      hex: "#9370db",
    },
    {
      dark: true,
      hex: "#0000ff",
    },
    {
      dark: true,
      hex: "#a020f0",
    },
    {
      dark: false,
      hex: "#f08080",
    },
    {
      dark: false,
      hex: "#adff2f",
    },
    {
      dark: true,
      hex: "#ff6347",
    },
    {
      dark: true,
      hex: "#ff00ff",
    },
    {
      dark: false,
      hex: "#f0e68c",
    },
    {
      dark: false,
      hex: "#6495ed",
    },
    {
      dark: false,
      hex: "#dda0dd",
    },
    {
      dark: false,
      hex: "#afeeee",
    },
    {
      dark: false,
      hex: "#ee82ee",
    },
    {
      dark: false,
      hex: "#98fb98",
    },
    {
      dark: false,
      hex: "#7fffd4",
    },
    {
      dark: false,
      hex: "#ff69b4",
    },
    {
      dark: false,
      hex: "#ffb6c1",
    },
  ];

  const hash = hashCode(seed).toString();
  const index: number = Math.abs(Number(hash));
  const truncated: number = index % colours.length;

  return colours[truncated];
};

const hashCode = (str: string) => {
  return str.split("").reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

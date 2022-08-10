import AppConfig from "@/constants/app";
import { IOcsStreamSearchParameters } from "@/models";

export const getStreamDataByTypeEndpoint = ({
  projectId,
  typeId,
  searchParameters,
}: {
  projectId?: number;
  typeId?: string;
  searchParameters: IOcsStreamSearchParameters;
}) => {
  // eslint-disable-next-line
  // @ts-ignore
  const apiUrl: string = AppConfig.API_URL.toString();

  const { startIndex, endIndex, count, temporal } = searchParameters;

  const query = !temporal
    ? `?startIndex=1&endIndex=${count}`
    : `?startIndex=${startIndex}&endIndex=${endIndex}`;

  return `${apiUrl}/projects/${projectId}/types/${typeId}/streams/data${query}`;
};

export const getStreamDataEndpoint = ({
  streamId,
  projectId,
  startIndex,
  endIndex,
  count,
}: {
  streamId: string;
  projectId?: number;
  startIndex?: string;
  endIndex?: string;
  count?: number;
}) => {
  // eslint-disable-next-line
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

  return `${apiUrl}/projects/${projectId}/streams/${streamId}/data?${query}`;
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

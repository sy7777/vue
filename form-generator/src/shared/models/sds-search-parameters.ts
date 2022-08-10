import { SdsSearchPeriod } from "@/shared/constants";

export interface ISdsSearchParameters {
  startIndex: string;
  endIndex: string;
  useCount: boolean;
  count: number;
  usePeriod: boolean;
  period: SdsSearchPeriod;
  temporal: boolean; // deprecated
}

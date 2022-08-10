import dayjs from "dayjs";

import { SdsSearchPeriod } from "@/shared/constants";

interface ISearchIndex {
  startIndex: string;
  endIndex: string;
}

export const getSdsSearchIndexByPeriod = (
  searchPeriod: SdsSearchPeriod
): ISearchIndex => {
  const now = dayjs();

  switch (searchPeriod) {
    case SdsSearchPeriod.BEGINNING_OF_TIME:
      return {
        startIndex: dayjs("1970-01-01").toISOString(),
        endIndex: now.toISOString(),
      };
    case SdsSearchPeriod.PAST_MONTH:
      return {
        startIndex: now.subtract(30, "day").toISOString(),
        endIndex: now.toISOString(),
      };
    case SdsSearchPeriod.PAST_WEEK:
      return {
        startIndex: now.subtract(7, "day").toISOString(),
        endIndex: now.toISOString(),
      };
    case SdsSearchPeriod.PAST_DAY:
      return {
        startIndex: now.subtract(1, "day").toISOString(),
        endIndex: now.toISOString(),
      };
    case SdsSearchPeriod.MONTH_TO_DATE: {
      const startOfMonth = now.startOf("month");

      return {
        startIndex: startOfMonth.toISOString(),
        endIndex: now.toISOString(),
      };
    }
    case SdsSearchPeriod.YEAR_TO_DATE: {
      const startOfYear = now.startOf("year");

      return {
        startIndex: startOfYear.toISOString(),
        endIndex: now.toISOString(),
      };
    }
    default:
      throw new Error(`Unexpected search period: ${searchPeriod}`);
  }
};

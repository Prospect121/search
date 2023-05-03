import { bingSearch } from "@/pages/api/bing.api";
import { ISearch } from "@/component/result-search/search.interface";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

export interface IPagination {
  paginations: number[];
  current: number;
}
const search = async (query: string, offset: number = 0, { dataSearch, setDataSearch }: any) => {
  const paramsDefault = `?count=${20}&offset=${offset}&q=${query}&responseFilter=Webpages&setLang=en`;
  try {
    const res: AxiosResponse<any> = await bingSearch.get(`/v7.0/search${paramsDefault}`);
    setDataSearch(res.data);
  } catch (error) {
    console.error(error);
  }
};

export const useResultsSearch = (query: string, offset: number = 0, { dataSearch, setDataSearch }: any): ISearch => {
  search(query, offset, { dataSearch, setDataSearch });

  return dataSearch;
};

export const useResultsSearchEffect = (query: string, offset: number = 0, { dataSearch, setDataSearch }: any): ISearch => {
  useEffect(() => {
    search(query, offset, { dataSearch, setDataSearch });
  }, []);

  return dataSearch;
};

export const usePagination = (value: number, total: number, lstCurrent: number[] = [], current?: number): IPagination => {
  const pagination: IPagination = {
    paginations: [],
    current: 1,
  };

  if (!current) {
    pagination.paginations = total > 10 ? generateListNumbers(1, 10) : generateListNumbers(1, total);
  } else {
    if (value === current || current < 1 || current > total) {
      pagination.paginations = lstCurrent;
    } else {
      pagination.paginations = value + 4 < total ? (value - 4 > 0 ? generateListNumbers(value - 4, value + 4) : generateListNumbers(1, 10)) : generateListNumbers(value, total);
    }
  }
  pagination.current = value;
  return pagination;
};

const generateListNumbers = (from: number, to: number): number[] => {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
};

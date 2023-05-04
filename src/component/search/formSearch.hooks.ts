import { baseUrlBgImg, bgImg, bingSearch } from "@/pages/api/bing.api";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { ISearchAuto } from "./search-auto.interface";
import { debounce } from "lodash";

export interface FormSearchExit {
  onChangeForm: (event: any) => void;
}

export const useResultsAuto = debounce((query: string, { dataSearch, setDataSearch }: any): ISearchAuto => {
  let paramsDefault = `?mkt=en-US&q=${query}`;

  const search = async () => {
    try {
      const res: AxiosResponse<any> = await bingSearch.get(`/v7.0/Suggestions${paramsDefault}`);
      setDataSearch(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  search();

  return dataSearch;
}, 500);

export const useFormSearch = ({ searchQuery, setSearchQuery }: any, { dataSearch, setDataSearch }: any): FormSearchExit => {
  const onChangeForm = useCallback(
    (event: any) => {
      setSearchQuery(event.target.value);
      CalluseResultsAuto(event.target.value);
    },
    [searchQuery]
  );

  const CalluseResultsAuto = (value: string) => {
    useResultsAuto(value, { dataSearch, setDataSearch });
  };

  return {
    onChangeForm,
  };
};

export const useBgImg = (): string => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const fetchBgImg = async () => {
      try {
        const res: AxiosResponse<any> = await bgImg.get(baseUrlBgImg);
        setUrl(res.data.url);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBgImg();
  }, []);

  return url ?? "";
};

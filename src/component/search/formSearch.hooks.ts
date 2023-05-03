import { baseUrlBgImg, bgImg, bingSearch } from "@/pages/api/bing.api";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { BehaviorSubject, Observable, debounceTime } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { ISearchAuto } from "./search-auto.interface";

export interface FormSearchExit {
  onChangeForm: (event: any) => void;
  changeValue$: Observable<any>;
}
const changeValue$ = new BehaviorSubject<string>("");

export const useFormSearch = ({ searchQuery, setSearchQuery }: any, { dataSearch, setDataSearch }: any): FormSearchExit => {
  const onChangeForm = useCallback(
    (event: any) => {
      setSearchQuery(event.target.value);
      changeValue$.next(event.target.value);
    },
    [searchQuery]
  );

  const CallUseResultAuto = (query: string, { dataSearch, setDataSearch }: any) => {
    useResultsAuto(query, { dataSearch, setDataSearch });
  };

  useEffect(() => {
    changeValue$
      .asObservable()
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        if (!!value && value.length >= 3) {
          CallUseResultAuto(value, { dataSearch, setDataSearch });
        }
      });
  }, []);

  return {
    onChangeForm,
    changeValue$: changeValue$.asObservable(),
  };
};

export const useResultsAuto = (query: string, { dataSearch, setDataSearch }: any): ISearchAuto => {
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

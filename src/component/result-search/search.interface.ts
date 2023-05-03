export interface ISearch {
  _type: string;
  queryContext: QueryContext;
  webPages: WebPages;
  rankingResponse: RankingResponse;
}

export interface QueryContext {
  originalQuery: string;
}

export interface RankingResponse {
  mainline: Mainline;
}

export interface Mainline {
  items: Item[];
}

export interface Item {
  answerType: AnswerType;
  resultIndex: number;
  value: ItemValue;
}

export enum AnswerType {
  WebPages = "WebPages",
}

export interface ItemValue {
  id: string;
}

export interface WebPages {
  webSearchUrl: string;
  totalEstimatedMatches: number;
  value: ValueElement[];
}

export interface ValueElement {
  id: string;
  name: string;
  url: string;
  isFamilyFriendly: boolean;
  displayUrl: string;
  snippet: string;
  dateLastCrawled: string;
  language: Language;
  isNavigational: boolean;
}

export enum Language {
  En = "en",
}

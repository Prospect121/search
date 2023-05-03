export interface ISearchAuto {
  _type: string;
  queryContext: QueryContext;
  suggestionGroups: SuggestionGroup[];
}

export interface QueryContext {
  originalQuery: string;
}

export interface SuggestionGroup {
  name: string;
  searchSuggestions: SearchSuggestion[];
}

export interface SearchSuggestion {
  url: string;
  displayText: string;
  query: string;
  searchKind: string;
}

const enum SearchTypePost {
  Notice = 'notice',
  Faq = 'faq',
}

interface SearchFilters {
  type: SearchTypePost | '';
}

interface SearchRequest {
  type: SearchTypePost | '';
}

export { SearchTypePost };
export type { SearchFilters, SearchRequest };

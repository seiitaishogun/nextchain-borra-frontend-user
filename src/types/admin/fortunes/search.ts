interface SearchFilters {
  type_id: number | null;
  template_id: number | null;
  search_value: string | null;
  date_type: string | null;
  started_at: Date | null;
  ended_at: Date | null;
}

interface SearchRequest {
  type_id: number | null;
  template_id: number | null;
  search_value: string | null;
  date_type: string | null;
  started_at: string | null;
  ended_at: string | null;
}

export type { SearchFilters, SearchRequest };

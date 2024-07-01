interface BannerData {
  id: number;
  file_id: number;
  file: {
    id: number;
  };
  name: string;
  link: string;
  type: 'top';
  is_open: boolean;
  started_at: string;
  ended_at: string;
}

const enum SearchType {
  All = 'all',
  Name = 'name',
  Link = 'link',
}

interface SearchFilters {
  search_type: SearchType;
  search_value: string;
  is_open: 0 | 1 | null;
  started_at: Date | null;
  ended_at: Date | null;
}

export type { BannerData, SearchFilters };
export { SearchType };

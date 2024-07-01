import { atom, selector } from 'recoil';
import { format } from 'date-fns';
import { SearchFilters, SearchType } from '@/types/admin/banner';

const searchFiltersState = atom<SearchFilters>({
  key: 'adminBannerSearchFilters',
  default: {
    search_type: SearchType.All,
    search_value: '',
    is_open: null,
    started_at: null,
    ended_at: null,
  },
});

const searchRequest = selector({
  key: 'adminBannerSearchRequest',
  get: ({ get }) => {
    const { search_type, search_value, is_open, started_at, ended_at } =
      get(searchFiltersState);

    return {
      search_type: search_type || SearchType.All,
      search_value: search_value || null,
      is_open: is_open || null,
      started_at: started_at && format(started_at, 'yyyy-MM-dd 00:00:00'),
      ended_at: ended_at && format(ended_at, 'yyyy-MM-dd 23:59:59'),
    };
  },
});

export { searchFiltersState, searchRequest };

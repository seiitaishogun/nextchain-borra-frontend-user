import { atom, selector } from 'recoil';
import { SearchFilters, SearchRequest } from '@/types/admin/posts/search';

const searchFiltersState = atom<SearchFilters | any>({
  key: 'adminUsersSearchFilters',
  default: {
    type: '',
  },
});

const searchRequestSelector = selector<SearchRequest | any>({
  key: 'adminUsersSearchRequest',
  get: ({ get }) => {
    const { type } = get(searchFiltersState);

    return {
      type: type || null,
    };
  },
});

export { searchFiltersState, searchRequestSelector };

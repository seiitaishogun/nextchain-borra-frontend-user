import { atom, selector } from 'recoil';
import { format } from 'date-fns';
import { DateType } from '@/types/admin/fortunes';
import { SearchFilters, SearchRequest } from '@/types/admin/fortunes/search';

const searchFiltersState = atom<SearchFilters>({
  key: 'adminDbsSearchFilters',
  default: {
    type_id: null,
    template_id: null,
    search_value: '',
    date_type: DateType.CreatedAt,
    started_at: null,
    ended_at: new Date(),
  },
});

const searchRequest = selector<SearchRequest>({
  key: 'adminDbsSearchFiltersSelector',
  get: ({ get }) => {
    const searchFilters = get(searchFiltersState);
    const {
      type_id,
      template_id,
      search_value,
      date_type,
      started_at,
      ended_at,
    } = searchFilters;

    return {
      type_id: type_id || null,
      template_id: template_id || null,
      search_value: search_value || null,
      date_type: date_type || null,
      started_at: started_at ? format(started_at, 'yyyy-MM-dd 00:00:00') : null,
      ended_at: ended_at ? format(ended_at, 'yyyy-MM-dd 23:59:59') : null,
    };
  },
});

export { searchFiltersState, searchRequest };

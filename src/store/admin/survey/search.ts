import { atom, selector } from 'recoil';
import { format } from 'date-fns';
import { SurveySearchFilters } from '@/types/admin/survey/list';

const searchFiltersState = atom<SurveySearchFilters>({
  key: 'adminSurveySearchFilters',
  default: {
    name: '',
    started_at: null,
    ended_at: null,
  },
});

const searchRequest = selector({
  key: 'adminSurveySearchRequest',
  get: ({ get }) => {
    const { name, started_at, ended_at } = get(searchFiltersState);

    return {
      name: name || null,
      started_at: started_at && format(started_at, 'yyyy-MM-dd 00:00:00'),
      ended_at: ended_at && format(ended_at, 'yyyy-MM-dd 23:59:59'),
    };
  },
});

export { searchFiltersState, searchRequest };

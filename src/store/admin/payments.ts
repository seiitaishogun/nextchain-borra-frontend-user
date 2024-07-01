import { atom, selector } from 'recoil';
import { format } from 'date-fns';
import { OrderT } from '@/components/Admin/Common/Table/types';
import { SearchType } from '@/types/admin/payments';

interface DefaultSearchFiltersT extends Omit<OrderT, 'order' | 'order_column'> {
  order?: string;
  order_column?: string;
}

const defaultSearchFilters: DefaultSearchFiltersT & any = {
  search_type: SearchType.Email,
  search_value: '',
  started_at: null,
  ended_at: new Date(),
  min_coin: null,
  max_coin: null,
  order_direction: '',
  order_column: '',
};

const searchFiltersState = atom({
  key: 'adminPaymentsSearchFilters',
  default: defaultSearchFilters,
});

const searchRequest = selector({
  key: 'adminPaymentsSearchFiltersSelector',
  get: ({ get }) => {
    const searchFilters = get(searchFiltersState);
    const {
      search_type,
      search_value,
      started_at,
      ended_at,
      min_coin,
      max_coin,
      order_direction,
      order_column,
    } = searchFilters;

    return {
      search_type,
      search_value: search_value || null,
      started_at: started_at ? format(started_at, 'yyyy-MM-dd 00:00:00') : null,
      ended_at: ended_at ? format(ended_at, 'yyyy-MM-dd 23:59:59') : null,
      min_coin: min_coin || 0,
      max_coin: max_coin || Number.MAX_SAFE_INTEGER,
      order_direction: order_direction || null,
      order_column: order_column || null,
    };
  },
});
export { defaultSearchFilters, searchFiltersState, searchRequest };

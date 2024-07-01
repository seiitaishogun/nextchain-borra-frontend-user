import { atom, selector } from 'recoil';
import { format } from 'date-fns';
import { OrderT } from '@/components/Admin/Common/Table/types';
import { CountType, SearchType } from '@/types/admin/contents/contents';

// import { SearchFilters } from '@/types/admin/contents/search';

interface DefaultSearchFiltersT extends Omit<OrderT, 'order' | 'order_column'> {
  search_type: SearchType;
  search_value?: string;
  started_at?: string;
  ended_at?: string;
  min_price?: number;
  max_price?: number;
  count_type: CountType;
  count_min_value?: number;
  count_max_value?: number;
  open_status?: number;
  visible_started_at?: string;
  visible_ended_at?: string;
  is_new?: number;
  is_hot?: number;
  is_discount?: number;
  category_id?: string;
  type_id?: string;
  tag_id?: string;
  order?: string;
  order_column?: string;
  site?: string;
}

const defaultSearchFilters: DefaultSearchFiltersT & any = {
  search_type: SearchType.All,
  search_value: '',
  started_at: null,
  ended_at: new Date(),
  min_price: null,
  max_price: null,
  count_type: CountType.Default,
  count_min_value: null,
  count_max_value: null,
  open_status: null,
  visible_started_at: null,
  visible_ended_at: null,
  is_new: 0,
  is_hot: 0,
  is_discount: 0,
  category_id: '',
  type_id: '',
  tag_id: '',
  order_direction: '',
  order_column: '',
  site: '',
};

const searchFiltersState = atom<any>({
  key: 'adminContentsSearchFilters',
  default: defaultSearchFilters,
});

const searchRequest = selector({
  key: 'adminContentsSearchFiltersSelector',
  get: ({ get }) => {
    const searchFilters = get(searchFiltersState);
    const {
      search_type,
      search_value,
      started_at,
      ended_at,
      min_price,
      max_price,
      count_type,
      count_min_value,
      count_max_value,
      open_status,
      visible_started_at,
      visible_ended_at,
      is_new,
      is_hot,
      is_discount,
      category_id,
      type_id,
      tag_id,
      order_direction,
      order_column,
      site,
    } = searchFilters;

    return {
      search_type,
      search_value: search_value || null,
      started_at: started_at ? format(started_at, 'yyyy-MM-dd 00:00:00') : null,
      ended_at: ended_at ? format(ended_at, 'yyyy-MM-dd 23:59:59') : null,
      min_price: min_price || 0,
      max_price: max_price || Number.MAX_SAFE_INTEGER,
      count_type: count_type === CountType.Default ? null : count_type,
      count_min_value: count_min_value || 0,
      count_max_value: count_max_value || Number.MAX_SAFE_INTEGER,
      open_status: open_status || null,
      visible_started_at: visible_started_at
        ? format(visible_started_at, 'yyyy-MM-dd 00:00:00')
        : null,
      visible_ended_at: visible_ended_at
        ? format(visible_ended_at, 'yyyy-MM-dd 23:59:59')
        : null,
      is_new: is_new ? 1 : null,
      is_hot: is_hot ? 1 : null,
      is_discount: is_discount ? 1 : null,
      category_id: category_id || null,
      type_id: type_id || null,
      tag_id: tag_id || null,
      order_direction: order_direction || null,
      order_column: order_column || null,
      site: site || null,
    };
  },
});

// 콘텐츠 등록 폼의 테마 검색
const defaultSearchThemeFilters = {
  tag_id: '',
  name: '',
};

const searchThemeFiltersState = atom({
  key: 'adminContentsSearchThemeFilters',
  default: defaultSearchThemeFilters,
});

const searchThemeRequest = selector({
  key: 'adminContentsSearchThemeFiltersSelector',
  get: ({ get }) => {
    const searchFilters = get(searchThemeFiltersState);

    const { tag_id, name } = searchFilters;
    return {
      tag_id: tag_id || null,
      name,
    };
  },
});

export {
  defaultSearchFilters,
  searchFiltersState,
  searchRequest,
  defaultSearchThemeFilters,
  searchThemeFiltersState,
  searchThemeRequest,
};

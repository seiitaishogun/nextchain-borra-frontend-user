import { atom, selector } from 'recoil';
import { format } from 'date-fns';
import { GenderE, MaritalE, ReferrerPathE, RegisterPathE } from '@/types/users';
import { formatObjectToArray } from '@/utils/admin/search';
import { SearchTypeE } from '@/types/admin/purchases/search';

const defaultSearchFilters = {
  search_type: SearchTypeE.Email,
  search_value: '',
  started_at: null,
  ended_at: new Date(),
  min_age: null,
  max_age: null,
  min_coin: null,
  max_coin: null,
  gender: {
    [GenderE.Male]: false,
    [GenderE.Female]: false,
  },
  marital: {
    [MaritalE.Single]: false,
    [MaritalE.Couple]: false,
    [MaritalE.Married]: false,
  },
  types: {},
  tags: {},
  register_path: {
    [RegisterPathE.Mobile]: false,
    [RegisterPathE.Web]: false,
  },
  referrer_path: {
    [ReferrerPathE.BORRA]: false,
    [ReferrerPathE.Pincrux]: false,
    [ReferrerPathE.Nbt]: false,
  },
  order_column: '',
  order_direction: '',
};

const searchFiltersState = atom({
  key: 'adminPurchaseSearchFilters',
  default: defaultSearchFilters,
});

const searchRequest = selector({
  key: 'adminPurchaseSearchFiltersSelector',
  get: ({ get }) => {
    const searchFilters = get(searchFiltersState);
    const {
      search_type,
      search_value,
      started_at,
      ended_at,
      min_age,
      max_age,
      min_coin,
      max_coin,
      gender,
      marital,
      types,
      tags,
      register_path,
      referrer_path,
      order_column,
      order_direction,
    } = searchFilters;

    return {
      search_type,
      search_value: search_value || null,
      started_at: started_at ? format(started_at, 'yyyy-MM-dd 00:00:00') : '',
      ended_at: format(ended_at, 'yyyy-MM-dd 23:59:59'),
      min_age: min_age || 0,
      max_age: max_age || Number.MAX_SAFE_INTEGER,
      min_coin: min_coin || 0,
      max_coin: max_coin || Number.MAX_SAFE_INTEGER,
      gender: formatObjectToArray(gender),
      marital: formatObjectToArray(marital),
      types: formatObjectToArray(types),
      tags: formatObjectToArray(tags),
      register_path: formatObjectToArray(register_path),
      referrer_path: formatObjectToArray(referrer_path),
      order_column: order_column || null,
      order_direction: order_direction || null,
    };
  },
});

export { defaultSearchFilters, searchFiltersState, searchRequest };

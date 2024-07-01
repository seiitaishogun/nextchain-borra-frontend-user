import { atom, selector } from 'recoil';
import { format } from 'date-fns';
import { GenderE, MaritalE, ReferrerPathE, RegisterPathE } from '@/types/users';
import { formatObjectToArray } from '@/utils/admin/search';
import {
  DateTypeE,
  SearchFilters,
  SearchRequest,
  SearchTypeE,
  StatusE,
} from '@/types/admin/users/search';

const searchFiltersState = atom<SearchFilters>({
  key: 'adminUsersSearchFilters',
  default: {
    search_type: SearchTypeE.Name,
    search_value: '',
    date_type: DateTypeE.CreatedAt,
    started_at: null,
    ended_at: new Date(),
    min_payment: null,
    max_payment: null,
    min_age: null,
    max_age: null,
    min_coin: null,
    max_coin: null,
    min_recommender: null,
    max_recommender: null,
    gender: {
      [GenderE.Male]: false,
      [GenderE.Female]: false,
    },
    marital: {
      [MaritalE.Single]: false,
      [MaritalE.Couple]: false,
      [MaritalE.Married]: false,
    },
    register_path: {
      [RegisterPathE.Mobile]: false,
      [RegisterPathE.Web]: false,
    },
    is_notify: {
      0: false,
      1: false,
    },
    is_mail: {
      0: false,
      1: false,
    },
    is_kakao: {
      0: false,
      1: false,
    },
    referrer_path: {
      [ReferrerPathE.BORRA]: false,
      [ReferrerPathE.Pincrux]: false,
      [ReferrerPathE.Nbt]: false,
    },
    tags: {},
    status: {
      [StatusE.Active]: false,
      [StatusE.Inactive]: false,
      [StatusE.Deleted]: false,
    },
    order_column: null,
    order_direction: null,
  },
});

const searchRequestSelector = selector<SearchRequest>({
  key: 'adminUsersSearchRequest',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore TODO: fix overloads call?
  get: ({ get }) => {
    const {
      search_type,
      search_value,
      date_type,
      started_at,
      ended_at,
      min_payment,
      max_payment,
      min_age,
      max_age,
      min_coin,
      max_coin,
      min_recommender,
      max_recommender,
      gender,
      marital,
      register_path,
      is_notify,
      is_mail,
      is_kakao,
      referrer_path,
      tags,
      status,
      order_column,
      order_direction,
    } = get(searchFiltersState);

    return {
      search_type,
      search_value: search_value || null,
      date_type,
      started_at: started_at ? format(started_at, 'yyyy-MM-dd 00:00:00') : null,
      ended_at: ended_at ? format(ended_at, 'yyyy-MM-dd 23:59:59') : null,
      min_payment: min_payment || 0,
      max_payment: max_payment || Number.MAX_SAFE_INTEGER,
      min_age: min_age || 0,
      max_age: max_age || Number.MAX_SAFE_INTEGER,
      min_coin: min_coin || 0,
      max_coin: max_coin || Number.MAX_SAFE_INTEGER,
      min_recommender: min_recommender || 0,
      max_recommender: max_recommender || Number.MAX_SAFE_INTEGER,
      gender: formatObjectToArray(gender),
      marital: formatObjectToArray(marital),
      register_path: formatObjectToArray(register_path),
      is_notify: formatObjectToArray(is_notify),
      is_mail: formatObjectToArray(is_mail),
      is_kakao: formatObjectToArray(is_kakao),
      referrer_path: formatObjectToArray(referrer_path),
      tags: formatObjectToArray(tags),
      status: formatObjectToArray(status),
      order_column: order_column || null,
      order_direction: order_direction || null,
    };
  },
});

export { searchFiltersState, searchRequestSelector };

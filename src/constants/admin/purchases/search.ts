import { Category, CoinEvent } from '@/types/admin/purchases';
import { SearchTypeE } from '@/types/admin/purchases/search';

const SEARCH_TYPE_OPTIONS = [
  { label: '이메일', value: SearchTypeE.Email },
  {
    label: '회원명',
    value: SearchTypeE.User,
  },
  {
    label: '콘텐츠명',
    value: SearchTypeE.Content,
  },
  {
    label: '테마명',
    value: SearchTypeE.Theme,
  },
];

const CATEGORY_OPTIONS = [
  {
    label: '사주',
    value: Category.Saju,
  },
  {
    label: '궁합',
    value: Category.Gunghab,
  },
  {
    label: '자미두수',
    value: Category.Jamidusu,
  },
  {
    label: '타로',
    value: Category.Taro,
  },
  {
    label: '띠별운세',
    value: Category.Ttibyeol,
  },
  {
    label: '주역',
    value: Category.Juyeog,
  },
  {
    label: '바이오리듬',
    value: Category.Bio,
  },
];

const COIN_EVENT_OPTIONS = [
  {
    label: '코인결제',
    value: CoinEvent.Coin,
  },
  {
    label: '휴대폰결제',
    value: CoinEvent.Phone,
  },
  {
    label: '간편결제',
    value: CoinEvent.Easy,
  },
  {
    label: '인앱결제',
    value: CoinEvent.InApp,
  },
];

export { SEARCH_TYPE_OPTIONS, CATEGORY_OPTIONS, COIN_EVENT_OPTIONS };

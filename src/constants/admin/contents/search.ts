import { CountType, SearchType } from '@/types/admin/contents/contents';

// 콘텐츠 등록 수정 시 사용하는 타입
enum OpenChannel {
  BORRA = 'borra',
  GUNGTA = 'gungta',
  NHPAY = 'nhpay',
  JK = 'jk',
}

const DISPLAY_OPTIONS = [
  {
    label: '미사용(사용 불가)',
    value: 0,
  },
  {
    label: '공개(오픈)',
    value: 1,
  },
  {
    label: '비공개(노출 제한)',
    value: 2,
  },
];

const WAIT_FREE_TIME_OPTIONS = [
  {
    label: '미사용',
    value: 0,
  },
  {
    label: '사용',
    value: 1,
  },
];

// 노출 채널
const SITE_OPTIONS = [
  {
    label: '보라',
    value: OpenChannel.BORRA,
  },
  { label: '궁타', value: OpenChannel.GUNGTA },
  { label: 'NHPAY', value: OpenChannel.NHPAY },
  { label: 'JK', value: OpenChannel.JK },
];

// 콘텐츠 조회 시 사용하는 타입
const SEARCH_TYPE_OPTIONS = [
  {
    label: '전체',
    value: SearchType.All,
  },
  {
    label: '콘텐츠명',
    value: SearchType.Name,
  },
  {
    label: '테마',
    value: SearchType.Theme,
  },
  {
    label: '콘텐츠코드',
    value: SearchType.Code,
  },
];

const COUNT_TYPE_OPTIONS = [
  {
    label: '좋아요',
    value: CountType.Likes,
  },
  {
    label: '조회수',
    value: CountType.Sails,
  },
  {
    label: '댓글',
    value: CountType.Comments,
  },
  {
    label: '공유횟수',
    value: CountType.Shares,
  },
];

export {
  SEARCH_TYPE_OPTIONS,
  SITE_OPTIONS,
  DISPLAY_OPTIONS,
  WAIT_FREE_TIME_OPTIONS,
  COUNT_TYPE_OPTIONS,
};

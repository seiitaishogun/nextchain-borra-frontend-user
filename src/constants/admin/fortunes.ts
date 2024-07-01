import { DateType, StatusE } from '@/types/admin/fortunes';
import { ContentsTypeE } from '@/types/content';

const IS_OPEN_OPTIONS = [
  {
    label: '중단',
    value: 0,
  },
  {
    label: '사용',
    value: 1,
  },
];

const IS_OPEN = {
  0: '중단',
  1: '사용',
};

const IS_SHOW_OPTIONS = [
  {
    label: '미노출',
    value: 0,
  },
  {
    label: '노출',
    value: 1,
  },
];

const IS_SHOW = {
  0: '노출',
  1: '미노출',
};

const GAN_OPTIONS = [
  {
    label: '선택안함',
    value: 0,
  },
  {
    label: '연간',
    value: 1,
  },
  {
    label: '월간',
    value: 2,
  },
  {
    label: '일간',
    value: 3,
  },
  {
    label: '시간',
    value: 4,
  },
  {
    label: '연간(오행)',
    value: 5,
  },
  {
    label: '월간(오행)',
    value: 6,
  },
  {
    label: '일간(오행)',
    value: 7,
  },
  {
    label: '시간(오행)',
    value: 8,
  },
  {
    label: '연간(육신)',
    value: 9,
  },
  {
    label: '월간(육신)',
    value: 10,
  },
  {
    label: '일간(육신)',
    value: 11,
  },
  {
    label: '시간(육신)',
    value: 12,
  },
];

const JI_OPTIONS = [
  {
    label: '선택안함',
    value: 0,
  },
  {
    label: '연지',
    value: 1,
  },
  {
    label: '월지',
    value: 2,
  },
  {
    label: '일지',
    value: 3,
  },
  {
    label: '시지',
    value: 4,
  },
  {
    label: '연지(오행)',
    value: 5,
  },
  {
    label: '월지(오행)',
    value: 6,
  },
  {
    label: '일지(오행)',
    value: 7,
  },
  {
    label: '시지(오행)',
    value: 8,
  },
  {
    label: '연지(육신)',
    value: 9,
  },
  {
    label: '월지(육신)',
    value: 10,
  },
  {
    label: '일지(육신)',
    value: 11,
  },
  {
    label: '시지(육신)',
    value: 12,
  },
];

const UN_OPTIONS = [
  {
    label: '선택안함',
    value: 0,
  },
  {
    label: '대운(천간)',
    value: 1,
  },
  {
    label: '대운(지지)',
    value: 2,
  },
  {
    label: '대운육친(천간)',
    value: 3,
  },
  {
    label: '대운육친(지지)',
    value: 4,
  },
];

const ADD_OPTIONS = [
  {
    label: '선택안함',
    value: 0,
  },
  {
    label: '성별',
    value: 1,
  },
  {
    label: '결혼여부',
    value: 2,
  },
  {
    label: '사용자선택',
    value: 3,
  },
];

const DATE_TYPE_OPTIONS = [
  { label: '등록일', value: DateType.CreatedAt },
  { label: '수정일', value: DateType.UpdatedAt },
];

const FORTUNE_STATUS_OPTIONS = [
  {
    label: '본인(일반)',
    value: StatusE.Normal,
    enabledType: [
      ContentsTypeE.Saju,
      ContentsTypeE.Juyeog,
      ContentsTypeE.Zodiac,
      ContentsTypeE.Constellation,
      ContentsTypeE.Jamidusu,
    ],
  },
  {
    label: '상대방',
    value: StatusE.Partner,
    enabledType: [ContentsTypeE.Saju],
  },
  {
    label: '궁합',
    value: StatusE.Couple,
    enabledType: [
      ContentsTypeE.Saju,
      ContentsTypeE.Zodiac,
      ContentsTypeE.Jamidusu,
    ],
  },
  {
    label: '타로 정방향&역방향',
    value: StatusE.Card,
    enabledType: [ContentsTypeE.Tarot],
  },
  {
    label: '타로 정방향',
    value: StatusE.CardStraight,
    enabledType: [ContentsTypeE.Tarot],
  },
];

export {
  IS_OPEN_OPTIONS,
  IS_OPEN,
  IS_SHOW_OPTIONS,
  IS_SHOW,
  GAN_OPTIONS,
  JI_OPTIONS,
  UN_OPTIONS,
  ADD_OPTIONS,
  DATE_TYPE_OPTIONS,
  FORTUNE_STATUS_OPTIONS,
};

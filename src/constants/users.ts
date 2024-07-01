import { CalendarE, GenderE, MaritalE, RegisterPathE } from '@/types/users';
import { StatusE } from '@/types/admin/users/search';

const GENDER_TEXT = {
  [GenderE.Male]: '남',
  [GenderE.Female]: '여',
};

const MARITAL_TEXT = {
  [MaritalE.Single]: '미혼(싱글)',
  [MaritalE.Couple]: '미혼(커플)',
  [MaritalE.Married]: '기혼',
};

const REGISTER_PATH_TEXT = {
  [RegisterPathE.Mobile]: '모바일',
  [RegisterPathE.Web]: '웹',
};

const STATUS_TEXT = {
  [StatusE.Active]: '가입',
  [StatusE.Inactive]: '휴면',
  [StatusE.Deleted]: '탈퇴',
};

const IS_NOTIFY_TEXT = {
  0: '비동의',
  1: '동의',
};

const IS_MAIL_TEXT = IS_NOTIFY_TEXT;

const CALENDAR_TEXT = {
  [CalendarE.Solar]: '양력',
  [CalendarE.Lunar]: '음력',
  [CalendarE.Leap]: '윤달',
};

const IS_CHARGE = [
  {
    label: '적립',
    value: true,
  },
  {
    label: '차감',
    value: false,
  },
];

const CALENDAR_OPTION = [
  {
    text: '양력',
    value: CalendarE.Solar,
  },
  {
    text: '음력',
    value: CalendarE.Lunar,
  },
  {
    text: '윤달',
    value: CalendarE.Leap,
  },
];

const MARITAL_OPTION = [
  {
    text: '미혼(솔로)',
    value: MaritalE.Single,
  },
  {
    text: '미혼(커플)',
    value: MaritalE.Couple,
  },
  {
    text: '기혼',
    value: MaritalE.Married,
  },
];

export {
  GENDER_TEXT,
  MARITAL_TEXT,
  REGISTER_PATH_TEXT,
  STATUS_TEXT,
  IS_NOTIFY_TEXT,
  IS_MAIL_TEXT,
  CALENDAR_TEXT,
  IS_CHARGE,
  CALENDAR_OPTION,
  MARITAL_OPTION,
};

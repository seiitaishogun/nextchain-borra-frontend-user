import { DateType } from '@/types/admin/users';
import { GenderE, MaritalE, ReferrerPathE, RegisterPathE } from '@/types/users';
import {
  GENDER_TEXT,
  MARITAL_TEXT,
  REGISTER_PATH_TEXT,
  STATUS_TEXT,
} from '@/constants/users';
import { SearchTypeE, StatusE } from '@/types/admin/users/search';

const SEARCH_TYPE_OPTIONS = [
  {
    label: '회원명',
    value: SearchTypeE.Name,
  },
  {
    label: '휴대폰',
    value: SearchTypeE.Phone,
  },
  {
    label: '이메일',
    value: SearchTypeE.Email,
  },
  {
    label: '최초 유입경로',
    value: SearchTypeE.ReferrerPath,
  },
  {
    label: 'ADID',
    value: SearchTypeE.Adid,
  },
];

const DATE_TYPE_OPTIONS = [
  { label: '가입일', value: DateType.CreatedAt },
  { label: '마지막 접속일', value: DateType.UpdatedAt },
];

const GENDER_OPTIONS = [
  {
    label: GENDER_TEXT[GenderE.Male],
    value: GenderE.Male,
  },
  {
    label: GENDER_TEXT[GenderE.Female],
    value: GenderE.Female,
  },
];

const MARITAL_OPTIONS = [
  {
    label: MARITAL_TEXT[MaritalE.Single],
    value: MaritalE.Single,
  },
  {
    label: MARITAL_TEXT[MaritalE.Couple],
    value: MaritalE.Couple,
  },
  {
    label: MARITAL_TEXT[MaritalE.Married],
    value: MaritalE.Married,
  },
];

const REGISTER_PATH_OPTIONS = [
  {
    label: REGISTER_PATH_TEXT[RegisterPathE.Mobile],
    value: RegisterPathE.Mobile,
  },
  {
    label: REGISTER_PATH_TEXT[RegisterPathE.Web],
    value: RegisterPathE.Web,
  },
];

const IS_NOTIFY_OPTIONS = [
  {
    label: '동의',
    value: 1,
  },
  {
    label: '비동의',
    value: 0,
  },
];

const IS_MAIL_OPTIONS = [
  {
    label: '동의',
    value: 1,
  },
  {
    label: '비동의',
    value: 0,
  },
];

const IS_KAKAO_OPTIONS = [
  {
    label: '동의',
    value: 1,
  },
  {
    label: '비동의',
    value: 0,
  },
];

const REFERRER_PATH_OPTIONS = [
  {
    label: '보라',
    value: ReferrerPathE.BORRA,
  },
  {
    label: 'Pincrux',
    value: ReferrerPathE.Pincrux,
  },
  {
    label: 'NBT',
    value: ReferrerPathE.Nbt,
  },
];

const STATUS_OPTIONS = [
  {
    label: STATUS_TEXT[StatusE.Active],
    value: StatusE.Active,
  },
  {
    label: STATUS_TEXT[StatusE.Inactive],
    value: StatusE.Inactive,
  },
  {
    label: STATUS_TEXT[StatusE.Deleted],
    value: StatusE.Deleted,
  },
];

export {
  DATE_TYPE_OPTIONS,
  SEARCH_TYPE_OPTIONS,
  GENDER_OPTIONS,
  MARITAL_OPTIONS,
  REGISTER_PATH_OPTIONS,
  IS_NOTIFY_OPTIONS,
  IS_MAIL_OPTIONS,
  IS_KAKAO_OPTIONS,
  REFERRER_PATH_OPTIONS,
  STATUS_OPTIONS,
};

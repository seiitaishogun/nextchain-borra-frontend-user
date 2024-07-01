import { notoSansKR, pretendard } from '@/utils/style/font';

const calcRem = (size: number) => `${size / 16}rem`;
const fontSizes = {
  small_xx: calcRem(10),
  small_x: calcRem(12),
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  lg_x: calcRem(20),
  lg_xx: calcRem(22),
  lg_xxx: calcRem(35),
};
const fontWeights = {
  lighter: '300',
  normal: '400',
  bold: '700',
  bolder: '800',
};
const fontFamilies = {
  pretendard: `${pretendard.style.fontFamily}, 'Noto Sans KR', sans-serif`,
  notoSans: `${notoSansKR.style.fontFamily}, sans-serif`,
};
const colors = {
  primary: '#8986ff',
  primaryLight: '#705BB7',
  primaryDark: '#7C65BE',
  primary800: '#7949FF',
  purple86: '#8660c4',
  purple22: '#001af6',
  pinkE5: '#e5897d',
  pinkF3: '#f3877d',
  yellowFE: '#fee500',
  yellowD0: '#d09d09',
  blue29: '#29a2d8',
  green63: '#639b90',
  black: '#222222',
  grey: '#aab7ce',
  greyF7: '#f7f7f7',
  greyF7f9: '#f7f9fc',
  greyE1: '#e1e1e1',
  white: '#ffffff',
};
const deviceSize = '360px';
const deviceMargin = '16px';
const theme = {
  fontSizes,
  fontWeights,
  fontFamilies,
  colors,
  deviceSize,
  deviceMargin,
  imageUrl: process.env.APP_IMAGE_URL,
};
export default theme;

import { CategoryE } from '@/types/category';

const CATEGORY_ICONS = {
  [CategoryE.Year]: `${process.env.APP_IMAGE_URL}/category/calendar.svg`,
  [CategoryE.Month]: `${process.env.APP_IMAGE_URL}/category/moon.svg`,
  [CategoryE.WaitFree]: `${process.env.APP_IMAGE_URL}/category/clock.svg`,
  [CategoryE.Theme]: `${process.env.APP_IMAGE_URL}/category/all.svg`,
  [CategoryE.Free]: `${process.env.APP_IMAGE_URL}/category/tea.svg`,
  [CategoryE.Saju]: `${process.env.APP_IMAGE_URL}/category/dark-bright.svg`,
  [CategoryE.Phone]: `${process.env.APP_IMAGE_URL}/category/tel.svg`,
  [CategoryE.FirstFree]: `${process.env.APP_IMAGE_URL}/category/note.svg`,
  [CategoryE.Tarot]: `${process.env.APP_IMAGE_URL}/category/card.svg`,
};

export { CATEGORY_ICONS };

import { SearchTypePost } from '@/types/admin/posts/search';

const IS_OPEN_OPTIONS = [
  {
    label: '비공개',
    value: 0,
  },
  {
    label: '공개',
    value: 1,
  },
];

const SEARCH_TYPE_OPTIONS = [
  {
    label: '공지사항',
    value: SearchTypePost.Notice,
  },
  {
    label: 'FAQ',
    value: SearchTypePost.Faq,
  },
];

export { SEARCH_TYPE_OPTIONS, IS_OPEN_OPTIONS };

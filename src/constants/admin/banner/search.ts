import { SearchType } from '@/types/admin/banner';

const SEARCH_TYPE_OPTIONS = [
  {
    label: '전체',
    value: SearchType.All,
  },
  {
    label: '배너명',
    value: SearchType.Name,
  },
  {
    label: '링크',
    value: SearchType.Link,
  },
];

const IS_OPEN_OPTIONS = [
  {
    label: '미사용',
    value: 0,
  },
  {
    label: '사용',
    value: 1,
  },
];

export { SEARCH_TYPE_OPTIONS, IS_OPEN_OPTIONS };

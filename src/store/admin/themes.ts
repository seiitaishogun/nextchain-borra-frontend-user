import { atom, selector } from 'recoil';

interface DefaultSearchFiltersT {
  tag_id: number | '';
  name: string;
  order_column?: string;
  order_direction?: string;
}

const defaultSearchFilters: DefaultSearchFiltersT & any = {
  tag_id: '',
  name: '',
};

const searchFiltersState = atom({
  key: 'adminThemeSearchFilters',
  default: defaultSearchFilters,
});

const searchRequest = selector({
  key: 'adminThemeSearchFiltersSelector',
  get: ({ get }) => {
    const searchFilters = get(searchFiltersState);

    const { tag_id, name, order_column, order_direction } = searchFilters;
    return {
      tag_id: tag_id || null,
      name: name || null,
      order_column: order_column || null,
      order_direction: order_direction || null,
    };
  },
});

export { defaultSearchFilters, searchFiltersState, searchRequest };

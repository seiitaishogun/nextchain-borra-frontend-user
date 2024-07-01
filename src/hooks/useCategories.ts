import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/api/common';
import { CATEGORY_ICONS } from '@/constants/category';
import { CategoriesT, CategoryE } from '@/types/category';

function useCategories() {
  const { data } = useQuery<
    {
      data: Array<{ id: number; name: string }>;
    },
    any,
    any
  >(['categories'], fetchCategories, {
    initialData: {
      data: [],
    },
    select: res =>
      res.data.map((item: CategoriesT) => ({
        ...item,
        icon: CATEGORY_ICONS[item.id as CategoryE],
      })),
  });

  return data as Array<{
    id: number;
    name: string;
    icon: string;
  }>;
}

export default useCategories;

const enum CategoryE {
  Theme = 1,
  Free = 2,
  Saju = 3,
  Tarot = 4,
  Month = 5,
  Year = 6,
  Phone = 7,
  WaitFree = 8,
  FirstFree = 9,
}

interface CategoriesT {
  id: CategoryE | number;
  name: string;
  icon?: string;
}

export { CategoryE };
export type { CategoriesT };

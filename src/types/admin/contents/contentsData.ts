interface Category {
  id: number;
  name: string;
}
type Categories = Array<Category>;

interface Type {
  id: number;
  name: string;
  description: string;
}
type Types = Array<Type>;

export type { Categories, Types };

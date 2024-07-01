import { Tag } from '@/types/tags';

interface ContentsT {
  id: number;
  code: string;
  site: string;
  open_status: IsOpen | null;
  name: string;
  summary: string;
  contents: string;
  category_id?: number | string;
  type_id: number | string;
  tags: Array<any>;
  themes: Array<any>;
  price: number | null;
  discount_price: number | null;
  discount_started_at: any;
  discount_ended_at: any;
  visible_started_at: any;
  visible_ended_at: any;
  created_at: any;
  is_discount: number;
  is_new: number;
  is_hot: number;
  banner: any;
  banner_text: any;
  thumbnail: any;
  thumbnail_large: any;
  parents: Array<ParentT>;
  children: Array<ChildrenT>;
  advertise?: {
    code: string;
    url: string;
    utm_url: string;
  };
}

interface ContentsListT {
  id: number;
  code: string;
  site: string;
  is_open: IsOpen;
  name: string;
  summary: string;
  contents: string;
  category: Category;
  type_id: number | string;
  type: Type;
  tags: Array<Tag>;
  themes: Array<ThemeT>;
  price: number;
  discount_price: number;
  discount_started_at: any;
  discount_ended_at: any;
  created_at: any;
  is_discount: number;
  is_new: number;
  is_hot: number;
  parents: Array<ParentT>;
  children: Array<ChildrenT>;
  likes_count: number;
  comments_count: number;
  sales_count: number;
  shares_count: number;
}

interface Category {
  id: number | null;
  name: string;
}

interface Type {
  id: number | null;
  name: string;
}

interface ParentT {
  id?: number | null;
  name: string;
  order: number;
  is_open?: IsOpen;
  children: Array<ChildrenT>;
}

interface ChildrenT {
  id?: number | null;
  parent_id: number;
  name: string;
  order: number;
  count?: number;
  is_open?: IsOpen;
  children_data: Array<ChildrenDataT>;
  sign?: null;
}

interface ChildrenDataT {
  id: number | null;
  type: { id: number; name: string };
  type_id: number;
  template: { id: number; name: string };
  template_id: number;
  name: string;
  condition1?: number;
  condition2?: number;
  condition3?: number;
  condition4?: number;
  is_partner?: 0 | 1;
  is_open: IsOpen;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  length?: number;
  order?: number;
  contents?: [];
}

interface ThemeT {
  tag_id: number | '';
  name: string;
  is_open: number;
  description: string;
  file_id?: number;
}

const enum SearchType {
  All = 'all',
  Name = 'name',
  Code = 'code',
  Theme = 'theme_name',
}

const enum CountType {
  Default = '',
  Likes = 'likes_count',
  Sails = 'sales_count',
  Shares = 'shares_count',
  Comments = 'comments_count',
}

const enum IsOpen {
  Unused,
  Open,
  Close,
}

export type {
  Category,
  Type,
  ContentsT,
  ParentT,
  ChildrenT,
  ThemeT,
  ChildrenDataT,
  ContentsListT,
};
export { SearchType, CountType, IsOpen };

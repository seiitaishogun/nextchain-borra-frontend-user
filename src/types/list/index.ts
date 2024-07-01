import { CommonListT } from '@/types/common/list';

interface ListT {
  id: number;
  thumbnail: string;
  name: string;
  summary: string;
  price: number;
  is_hot: boolean;
  is_new: boolean;
  view_count: number;
  like_count: number;
}

interface ListContentT extends CommonListT {
  list: ListT[];
}

interface DiscountListT extends ListT {
  discount_price: number;
  is_discount: boolean;
}

interface DiscountListContentT extends ListContentT {
  list: DiscountListT[];
}

interface ListRequest {
  page: number;
}

export type { ListT, ListContentT, DiscountListContentT, ListRequest };

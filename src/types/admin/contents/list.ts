interface ContentsList {
  id: number;
  open_status: string;
  category: string;
  type: string;
  name: string;
  price: string;
  discount_price: string;
  is_discount: string;
  code: string;
  tags: string;
  themes: string;
  is_new: string;
  is_hot: string;
  create_at: string;
  likes_count: string;
  sales_count: string;
  comments_count: string;
  shares_count: string;
  site: string;
  visible_started_at: string;
  visible_ended_at: string;
}

export type { ContentsList };

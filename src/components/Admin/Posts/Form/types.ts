interface CreateFormT {
  category: string | null;
  contents: string;
  id: number;
  is_open: boolean;
  name: string;
  type: number | string;
  user_id: number;
}

export type { CreateFormT };

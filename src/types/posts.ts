const enum Type {
  Notice = 'notice',
  Event = 'event',
}

interface Post {
  contents: string;
  created_at: null | string;
  deleted_at: null | string;
  id: number;
  is_open: boolean;
  name: string;
  type: Type | null;
  updated_at: null | string;
  user_id: number;
}

export type { Post };

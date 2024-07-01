interface FortunesList {
  id: number;
  contents: Array<{ id: number; name: string }>;
  content: any;
  type: any;
  template: any;
  name: string;
  created_at: string;
  updated_at: string;
  is_open: string;
}

export type { FortunesList };

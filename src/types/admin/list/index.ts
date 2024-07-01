interface AdminListT<T> {
  counts: {
    search_count: string | null;
    search_sum: string | null;
    total_count: string | null;
    total_sum: string | null;
    type_count: Record<number, string> | null;
  };
  paginate: number;
  list: Array<T>;
}

export type { AdminListT };

import { ListContentT, ListT } from '@/types/list';

interface AccountListT extends ListT {
  content_id: number;
}

interface AccountListContentT extends ListContentT {
  list: AccountListT[];
}

interface AccountCardResponse {
  data: {
    content_id: number;
    id: number;
    name: string;
    view_count: number;
    thumbnail: string;
  }[];
}

interface AccountListResponse {
  data: AccountListContentT;
}

export type {
  AccountListT,
  AccountListContentT,
  AccountCardResponse,
  AccountListResponse,
};

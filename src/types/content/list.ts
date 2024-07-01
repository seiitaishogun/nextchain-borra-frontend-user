import { DiscountListContentT, ListContentT, ListRequest } from '@/types/list';

interface CategoryContentsRequest extends ListRequest {
  category_id: number;
}

interface CategoryContentsResponse {
  data: DiscountListContentT;
}

interface TagContentsRequest extends ListRequest {
  tag_id: number;
}

interface TagContentsResponse {
  data: DiscountListContentT;
}

interface HotContentsResponse {
  data: ListContentT;
}

interface FreeContentsResponse {
  data: ListContentT;
}

export type {
  CategoryContentsRequest,
  CategoryContentsResponse,
  TagContentsRequest,
  TagContentsResponse,
  HotContentsResponse,
  FreeContentsResponse,
};

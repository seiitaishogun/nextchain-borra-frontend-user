import { instance } from '@/utils/axios';
import {
  CategoryContentsRequest,
  CategoryContentsResponse,
  FreeContentsResponse,
  HotContentsResponse,
  TagContentsRequest,
  TagContentsResponse,
} from '@/types/content/list';
import { ListRequest } from '@/types/list';

const fetchCategoryContents = async ({
  category_id,
  ...params
}: CategoryContentsRequest) => {
  const { data } = await instance.get<CategoryContentsResponse>(
    `/contents/categories/${category_id}`,
    { params }
  );
  return data;
};

const fetchTagContents = async ({ tag_id, ...params }: TagContentsRequest) => {
  const { data } = await instance.get<TagContentsResponse>(
    `/contents/tags/${tag_id}`,
    { params }
  );
  return data;
};

const fetchHotContents = async (params: ListRequest) => {
  const { data } = await instance.get<HotContentsResponse>(
    `/contents/main/hot/index`,
    { params }
  );
  return data;
};

const fetchFreeContents = async (params: ListRequest) => {
  const { data } = await instance.get<FreeContentsResponse>(
    `/contents/main/free/index`,
    { params }
  );
  return data;
};

export {
  fetchCategoryContents,
  fetchTagContents,
  fetchHotContents,
  fetchFreeContents,
};

import { adminInstance } from '@/utils/axios';

interface ListProps {
  page: number;
}

const fetchBannerList = async (params: ListProps) => {
  const { data } = await adminInstance.get('/banners', { params });
  return data;
};

const fetchBannerDetail = async (id: number) => {
  const { data } = await adminInstance.get(`/banners/${id}`);
  return data;
};

interface CreateProps {
  file_id: number;
  name: string;
  link: string;
  is_open: boolean;
  started_at: string;
  ended_at: string;
}

const fetchBannerCreate = async (params: CreateProps) => {
  const { data } = await adminInstance.post('/banners', params);
  return data;
};

interface UpdateProps extends CreateProps {
  id: number;
}

const fetchBannerUpdate = async ({ id, ...params }: UpdateProps) => {
  const { data } = await adminInstance.put(`/banners/${id}`, params);
  return data;
};

const fetchBannerDelete = async (id: number) => {
  const { data } = await adminInstance.delete(`/banners/${id}`);
  return data;
};

export {
  fetchBannerList,
  fetchBannerDetail,
  fetchBannerCreate,
  fetchBannerUpdate,
  fetchBannerDelete,
};

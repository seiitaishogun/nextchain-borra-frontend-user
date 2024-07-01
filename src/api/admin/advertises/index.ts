import { adminInstance } from '@/utils/axios';

interface ListProps {
  page: number;
}

const fetchAdvertisesList = async (params: ListProps) => {
  const { data } = await adminInstance.get(`/advertises`, { params });
  return data;
};

const fetchAdvertisesDetail = async (id: number) => {
  const { data } = await adminInstance.get(`/advertises/${id}`);
  return data;
};

interface CreateProps {
  content_id: number;
  code: string;
  type: string;
}

const fetchAdvertisesCreate = async (params: CreateProps) => {
  const { data } = await adminInstance.post('advertises', params);
  return data;
};

interface UpdateProps extends CreateProps {
  id: number;
}

const fetchAdvertisesUpdate = async ({ id, ...params }: UpdateProps) => {
  const { data } = await adminInstance.put(`/advertises/${id}`, params);
  return data;
};

const fetchAdvertisesDelete = async (id: number) => {
  const { data } = await adminInstance.delete(`/advertises/${id}`);
  return data;
};

export {
  fetchAdvertisesList,
  fetchAdvertisesDetail,
  fetchAdvertisesCreate,
  fetchAdvertisesUpdate,
  fetchAdvertisesDelete,
};

import { adminInstance } from '@/utils/axios';

const fetchFileUpload = async (params: FormData) => {
  const { data } = await adminInstance.post('/upload', params);
  return data;
};

export { fetchFileUpload };

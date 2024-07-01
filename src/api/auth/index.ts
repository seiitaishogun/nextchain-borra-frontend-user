import { instance } from '@/utils/axios';
import { RegisterProps } from '@/types/users';

const fetchRegister = async (params: RegisterProps) => {
  const { data } = await instance.put(`/accounts/update`, params);
  return data;
};

const fetchUser = async () => {
  const { data } = await instance.get('/auth/user');
  return data;
};

const logout = async () => {
  const { data } = await instance.post('/auth/logout');
  return data;
};

const leave = async (params: { deleted_reason: string }) => {
  const { data } = await instance.delete('/accounts', {
    data: params,
  });
  return data;
};

const loginSample = async (params: { hash_code: string }) => {
  const { data } = await instance.get('/login/sample', { params });
  return data;
};

export { fetchRegister, fetchUser, logout, leave, loginSample };

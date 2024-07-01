import { instance } from '@/utils/axios';

interface LoginRequest {
  code: string;
  redirect_uri: string;
}

interface LoginResponse {
  data: {
    status: number;
    token: string;
    is_register: boolean;
  };
}

const fetchKakaoLogin = async (params: LoginRequest) => {
  const { data } = await instance.post<LoginResponse>(
    `/login/kakao/web`,
    params
  );
  return data;
};

const fetchAppleLogin = async (params: LoginRequest) => {
  const { data } = await instance.post<LoginResponse>(
    `/login/apple/web`,
    params
  );
  return data;
};

export { fetchKakaoLogin, fetchAppleLogin };

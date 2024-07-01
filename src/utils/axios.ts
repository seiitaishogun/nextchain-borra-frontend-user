import axios, { InternalAxiosRequestConfig } from 'axios';
import { getCookie, setCookies } from 'cookies-next';

const ACCESS_TOKEN = getCookie('access_token');
const baseURL = process.env.APP_USER_API_URL;
const adminBaseURL = process.env.APP_ADMIN_API_URL;
const headers = {
  Accept: 'application/json',
  Authorization: ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : '',
};
const setLoginToken = (access_token: string) => {
  setCookies('access_token', access_token, {
    expires: new Date(2099, 0, 1),
  });
};

const instanceWithAuth = (config: InternalAxiosRequestConfig<any>) => {
  const newConfig = config;
  const token = getCookie('access_token');

  newConfig.headers.Accept = 'application/json';
  newConfig.headers.Authorization = `Bearer ${token}`;
  return newConfig;
};

const instance = axios.create({
  baseURL,
  headers,
});
instance.interceptors.request.use(instanceWithAuth);

const adminInstance = axios.create({
  baseURL: adminBaseURL,
  headers,
});
adminInstance.interceptors.request.use(instanceWithAuth);

export { instance, adminInstance, setLoginToken, ACCESS_TOKEN };

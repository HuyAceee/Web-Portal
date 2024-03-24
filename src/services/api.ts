import axios, { AxiosRequestConfig } from 'axios'
import { BASE_URL } from 'constant';
import { ACCESS_TOKEN } from 'constant/key';
import { handleLocalStorage } from 'utils/localStorage';

export const api = axios.create({
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
})

const requestInterceptor = (config: AxiosRequestConfig): any => {
  const { getLocalStorage } = handleLocalStorage();
  const accessToken = getLocalStorage(ACCESS_TOKEN);
  if (accessToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  config.baseURL = "http://localhost:8080"
  return config;
};

api.interceptors.request.use(requestInterceptor)

api.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    if (error.response.data.code === 401) {
    }
    return Promise.reject(error)
  }
)

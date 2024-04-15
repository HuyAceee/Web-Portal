import axios, { AxiosRequestConfig } from 'axios'
import { ACCESS_TOKEN } from 'constant/key';
import { LOGIN_PAGE } from 'constant/router';
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
  config.baseURL = "https://mail.lucifer.io.vn"
  return config;
};

api.interceptors.request.use(requestInterceptor)

api.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      console.log(error)
      window.location.replace(LOGIN_PAGE)
    }
    return Promise.reject(error)
  }
)

import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, isAxiosError } from "axios";
import tokenStorage from "../utils/tokenStorage";
import { ACCESS_TOKEN_KEY } from "../constants/key";

axios.defaults.withCredentials = true;

// accessToken 재발급 api 호출
const refreshAccessToken = async (axiosInstance: AxiosInstance, axiosConfig: InternalAxiosRequestConfig) => {
  const storage = tokenStorage(ACCESS_TOKEN_KEY);
  try {
    const response = await API.post("/reissue");
    if (response.status === 200) {
      storage.set(response.headers.Authorization);
      axiosInstance(axiosConfig);
      return response;
    }
  } catch (e) {
    if (isAxiosError(e) && e.status === 401) {
      storage.remove();
      alert("로그인이 필요해요.");
      window.location.href = "/";
      return Promise.reject();
    }
  }
  return false;
};

const setInterceptors = (instance: AxiosInstance) => {
  // request interceptor 설정
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    },
  );

  // response interceptor 설정
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401 && !!error.config && error.config.url !== "/reissue") {
        refreshAccessToken(API, error.config);
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export const API = setInterceptors(
  axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: { "X-Custom-Header": "foobar" },
    timeout: 3000,
  }),
);

export const TRACK_API = setInterceptors(
  axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "/" : process.env.REACT_APP_TRACK_API,
    headers: { "X-Custom-Header": "foobar" },
    timeout: 3000,
  }),
);

export const LOCAL_API = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: { "X-Custom-Header": "foobar" },
  timeout: 3000,
});

export const TEST_API = axios.create({
  baseURL: "http://ec2-13-124-123-6.ap-northeast-2.compute.amazonaws.com:8080/",
  headers: {
    "X-Custom-Header": "foobar",
  },
});

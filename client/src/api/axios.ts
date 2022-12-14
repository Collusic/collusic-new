import axios, { AxiosInstance } from "axios";

axios.defaults.withCredentials = true;

const setInterceptors = (instance : AxiosInstance) => {
  // request interceptor 설정
  instance.interceptors.request.use(
    (config) => {
      return config;
    }, (error) => {
      console.error(error);
      return Promise.reject(error);
    }
  );

  // request interceptor 설정
  instance.interceptors.response.use(
    (response) => {
      const accessToken = response.headers.Authorization;

      if (accessToken) {
        API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      }

      return response;
    }, (error) => {
      console.error(error);
      return Promise.reject(error);
    }
  );

  return instance;
}

export const API = setInterceptors(
  axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: { "X-Custom-Header": "foobar" },
    timeout: 3000,
  })
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

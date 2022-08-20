import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_MOCK_API,
  headers: { "X-Custom-Header": "foobar" },
  withCredentials: true,
  timeout: 1000,
});

export const LOCAL_API = axios.create({
  baseURL: "http://localhost:8080/",
  headers: { "X-Custom-Header": "foobar" },
  withCredentials: true,
  timeout: 2000,
});

export const TEST_API = axios.create({
  baseURL: "http://ec2-13-124-123-6.ap-northeast-2.compute.amazonaws.com:8080/",
  headers: {
    "X-Custom-Header": "foobar",
  },
});

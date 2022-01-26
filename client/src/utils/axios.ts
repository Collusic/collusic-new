import axios from "axios";

export const API = axios.create({
  baseURL: "http://collusic.com/",
  headers: { "X-Custom-Header": "foobar" },
  timeout: 1000,
});

export const TEST_API = axios.create({
  baseURL: "http://ec2-13-124-123-6.ap-northeast-2.compute.amazonaws.com:8080/",
  headers: {
    "X-Custom-Header": "foobar",
  },
  timeout: 5000,
});

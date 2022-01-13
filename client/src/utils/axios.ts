import axios from "axios";

export const API = axios.create({
  baseURL: "http://collusic.com/",
  headers: { "X-Custom-Header": "foobar" },
  timeout: 1000,
});

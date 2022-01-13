import { atom, selector } from "recoil";

import { API } from "../utils/axios";

export const requestProjectListState = atom({
  key: "requestProjectListState",
  default: [],
});

export const getRequestProjects = selector({
  key: "getRequestProjects",
  get: async ({ get }) => {
    try {
      const response = await API.get("/requestList");
      const data = await response.data;
      return { data };
    } catch (err) {
      new Error("get api가 호출되지 않았습니다.");
    }
  },
});

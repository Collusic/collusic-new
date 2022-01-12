import { atom, selector } from "recoil";

export const requestProjectListState = atom({
  key: "requestProjectListState",
  default: [],
});

export const getRequestProjects = selector({
  key: "getRequestProjects",
  get: async ({ get }) => {
    const url = "http://collusic.com/get/";
    try {
      const response = await fetch(url);
      const data = await response.json();
      return { data };
    } catch (err) {
      new Error("get api가 호출되지 않았습니다.");
    }
  },
});

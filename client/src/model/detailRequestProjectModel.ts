import { atom, selector } from "recoil";

import { API } from "../utils/axios";

const detailRequestProjectId = atom({
  key: "detailRequestProjectId",
  default: "0",
});

const getDetailRequest = selector({
  key: "getDetailRequest",
  get: async ({ get }) => {
    const id = get(detailRequestProjectId);
    const { data } = await API.get(`/requestprojects/id=${id}`);
    return data;
  },
});

export { detailRequestProjectId, getDetailRequest };

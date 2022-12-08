import { atom, selector } from "recoil";

import { TEST_API } from "../api/axios";

export const requestProjectListState = atom({
  key: "requestProjectListState",
  default: [],
});

export const currentPageState = atom({
  key: "currentPageState",
  default: 1,
});

export const getPageList = selector({
  key: "getPageList",
  get: ({ get }) => {
    const [getReqeustData, totalPages] = get(getRequestList);

    const currentPage = get(currentPageState);
    let pageList = [];
    if (currentPage === 1 || currentPage === 2) {
      if (totalPages > 4) {
        pageList = [1, 2, 3, 4, 5];
        return pageList;
      } else {
        for (let i = 0; i < totalPages; i++) {
          pageList.push(i + 1);
        }
        return pageList;
      }
    } else if (currentPage === totalPages) {
      for (let i = 0; i < 5; i++) {
        pageList.push(currentPage - 5 + i);
      }
      return pageList;
    } else if (currentPage === totalPages - 1) {
      for (let i = 0; i < 5; i++) {
        pageList.push(currentPage - 4 + i);
      }
      return pageList;
    } else {
      for (let i = 0; i < 5; i++) pageList.push(currentPage - 2 + i);
      return pageList;
    }
  },
});

export const forceReloadBoardListState = atom({
  key: "forceReloadBoardListState",
  default: 0,
});

// const getData = (page: number): Promise<any> =>
//   TEST_API.get("/api/main/requestprojects", { params: { page } });

export const getRequestList = selector<any>({
  key: "getRequestList",
  get: async ({ get }) => {
    // try {
    //   const currentPage = get(currentPageState);
    //   const response = await TEST_API.get(
    //     `/api/main/requestprojects?page=${currentPage - 1}`
    //   );
    //   const { requestProjectResponseDtos } = await response.data;
    //   return requestProjectResponseDtos;
    // } catch (err) {
    //   new Error("get api가 호출되지 않았습니다.");
    // }
    // get(forceReloadBoardListState);
    get(forceReloadBoardListState);
    const currentPage = get(currentPageState);
    const response = await TEST_API.get(`/api/main/requestprojects?page=${currentPage - 1}`);
    // console.log(response);
    // const response = await getData(currentPage - 1);

    const { requestProjectResponseDtos, totalPages } = await response.data;
    return [requestProjectResponseDtos, totalPages];
  },
  set: ({ set }) => {
    set(forceReloadBoardListState, Math.random());
  },
  // set: ({ set }) => {
  //   set(forceReloadBoardListState, Math.random());
  // },
});

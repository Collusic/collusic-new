import { atom, selector } from "recoil";
import { ContributeProject } from "../types/contributeProjectType";
import { User } from "../types/userType";
import { TEST_API } from "../api/axios";

const detailRequestProjectIdState = atom({
  key: "detailRequestProjectIdState",
  default: "1",
});

const getDetailRequestState = selector({
  key: "getDetailRequestState",
  get: async ({ get }) => {
    const id = get(detailRequestProjectIdState);
    const { data } = await TEST_API.get(
      `api/requestprojects/${id}/contributeprojects`
    );

    return {
      userProfile: data.userProfile,
      userDetail: data.userDetail,
      userEmail: data.email,
      id: data.id,
      title: data.title,
      content: data.content,
      fields: data.fields,
      genres: data.genres,
      moods: data.moods,
      lyrics: data.lyrics,
      uploadFilePath: data.uploadFilePath,
      contributeProjectResponseDtos: data.contributeProjectResponseDtos,
    };
  },
});

const contributeListState = selector<Array<User & ContributeProject>>({
  key: "contributeListState",
  get: ({ get }) => {
    const data = get(getDetailRequestState);
    const contributeList = data.contributeProjectResponseDtos!;
    return contributeList;
  },
});

export {
  detailRequestProjectIdState,
  getDetailRequestState,
  contributeListState,
};

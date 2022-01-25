import { atom, selector } from "recoil";
import { ContributeProject } from "../types/contributeProjectType";
import { RequestProjectType } from "../types/requestProjectType";
import { User } from "../types/userType";
// import { API } from "../utils/axios";

const detailRequestProjectIdState = atom({
  key: "detailRequestProjectIdState",
  default: "0",
});

const getDetailRequestState = selector<User & RequestProjectType>({
  key: "getDetailRequestState",
  get: ({ get }) => {
    // const id = get(detailRequestProjectIdState);
    // const { data } = await API.get(`/requestprojects/?id=${id}`);
    return {
      userProfile: "",
      userDetail: "test",
      userEmail: "spiderq10",
      requestProjectId: 1,
      requestTitle: "test go",
      requestContent: "test",
      requestField: ["melody"],
      requestGenre: ["Hiphop"],
      requestMood: ["Happy"],
      requestInstrument: "",
      requestLyric: "",
      requestMelody: "",
      contributeList: [
        {
          userProfile: "",
          userEmail: "spiderq10@gmail.com",
          contributeProjectId: 1,
          contributeField: ["melody"],
          contributeContent: "hi",
          contributeLyric: "",
          contributeInstrument: "",
          contributeMelody: "src",
        },
        {
          userProfile: "",
          userEmail: "spiderq10@gmail.com",
          contributeProjectId: 2,
          contributeField: ["instrument"],
          contributeContent: "hi",
          contributeLyric: "가사 들어왔다!",
          contributeInstrument: "",
          contributeMelody: "src",
        },
      ],
    };

    // return {
    //   userProfile: data.userProfile,
    //   userDetail: data.userDetail,
    //   userEmail: data.email,
    //   requestProjectId: data.requestProjectId,
    //   requestTitle: data.requestTitle,
    //   requestContent: data.requestContent,
    //   requestField: data.requestField,
    //   requestGenre: data.requestGenre,
    //   requestMood: data.requestMood,
    //   requestInstrument: data.requestInstrument,
    //   requestLyric: data.requestLyric,
    //   requestMelody: data.requestMelody,
    // };
  },
});

const contributeListState = selector<Array<User & ContributeProject>>({
  key: "contributeListState",
  get: ({ get }) => {
    const data = get(getDetailRequestState);
    const contributeList = data.contributeList!;
    return contributeList;
  },
});

export {
  detailRequestProjectIdState,
  getDetailRequestState,
  contributeListState,
};

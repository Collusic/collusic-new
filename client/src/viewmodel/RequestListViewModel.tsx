import React from "react";
import { useRecoilValue } from "recoil";

// import { getRequestList } from "../model/requestProjectsModel";
import { RequestProjectType } from "../types/requestProjectType";
import { User } from "../types/userType";
import { RequestListView } from "../view/RequestListView";

export const RequestListViewModel: React.FC = () => {
  // const requestList = useRecoilValue(getRequestList);
  // upload의 타입에 따라 img태그안에 src를 넣을지, 가사를 텍스트로 집어넣을지 결정해야
  const defaultRequestList: Array<User & RequestProjectType> = [
    {
      requestProjectId: 1,
      userProfile: "test1",
      userEmail: "test1",
      requestTitle: "test1",
      requestField: ["melody"],
      requestGenre: ["hiphop"],
      requestMood: ["happy"],
      requestLyric: "이 멜로디 너무 좋아",
    },
    {
      requestProjectId: 2,
      userProfile: "test2",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["hiphop"],
      requestMood: ["happy"],
      requestInstrument: "s3.com/fesaieja",
    },
  ];
  return <RequestListView requestList={defaultRequestList}></RequestListView>;
};

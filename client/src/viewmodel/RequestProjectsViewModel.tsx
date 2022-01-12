import React from "react";
import { useRecoilValue } from "recoil";

import { getRequestProjects } from "../model/requestProjectsModel";
import { RequestProjectType } from "../types/requestProjectType";
import { User } from "../types/userType";
import { RequestProjectsView } from "./../view/RequestProjectsView";

export const RequestProjectsViewModel: React.FC = () => {
  const requestProjects = useRecoilValue(getRequestProjects);
  // upload의 타입에 따라 img태그안에 src를 넣을지, 가사를 텍스트로 집어넣을지 결정해야
  const defaultRequestProjects: Array<User & RequestProjectType> = [
    {
      userProfile: "test1",
      userEmail: "test1",
      requestTitle: "test1",
      requestField: ["melody"],
      requestGenre: ["hiphop"],
      requestMood: ["happy"],
      requestLyric: "이 멜로디 너무 좋아",
    },
    {
      userProfile: "test2",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["hiphop"],
      requestMood: ["happy"],
      requestInstrument: "s3.com/fesaieja",
    },
  ];
  return (
    <RequestProjectsView
      requestProjects={defaultRequestProjects}
    ></RequestProjectsView>
  );
};

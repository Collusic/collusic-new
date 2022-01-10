import React from "react";
import { useRecoilValue } from "recoil";

import { getRequestProjects } from "../model/requestProjectsModel";
import { RequestProjectType } from "../types/requestProjectType";
import { User } from "../types/userType";
import { RequestProjectsView } from "./../view/RequestProjectsView";

export const RequestProjectsViewModel: React.FC = () => {
  const requestProjects = useRecoilValue(getRequestProjects);
  const defaultRequestProjects: User & RequestProjectType = [
    {
      userProfile: "test1",
      userEmail: "test1",
      requestTitle: "test1",
      requestField: ["melody"],
      requestGenre: ["hiphop"],
      requestMood: ["happy"],
      upload: "test1",
    },
    {
      userProfile: "test2",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["hiphop"],
      requestMood: ["happy"],
      upload: "test2",
    },
  ];
  return (
    <RequestProjectsView
      requestProjects={defaultRequestProjects}
    ></RequestProjectsView>
  );
};

import React from "react";

import { User } from "../types/userType";
import { RequestProjectType } from "../types/requestProjectType";
import { RequestProjectView } from "./RequestProjectView";

type RequestProjectsProps = {
  requestProjects: Array<User & RequestProjectType>;
};

export const RequestProjectsView: React.FC<RequestProjectsProps> = ({
  requestProjects,
}) => {
  return (
    <React.Fragment>
      {requestProjects.map((requestProject) => {
        return (
          <RequestProjectView
            userProfile={requestProject.userProfile}
            userEmail={requestProject.userEmail}
            requestTitle={requestProject.requestTitle}
            requestField={requestProject.requestField}
            requestGenre={requestProject.requestGenre}
            requestMood={requestProject.requestMood}
            requestLyric={requestProject.requestLyric}
            requestInstrument={requestProject.requestInstrument}
            requestMelody={requestProject.requestMelody}
          ></RequestProjectView>
        );
      })}
    </React.Fragment>
  );
};

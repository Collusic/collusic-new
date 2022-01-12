import React from "react";

import { User } from "../types/userType";
import { RequestProjectType } from "../types/requestProjectType";
import { RequestProjectView } from "./RequestProjectView";

type RequestListProps = {
  requestList: Array<User & RequestProjectType>;
};

export const RequestListView: React.FC<RequestListProps> = ({
  requestList,
}) => {
  return (
    <React.Fragment>
      {requestList.map((requestProject) => {
        return (
          <RequestProjectView
            key={requestProject.requestProjectId}
            userProfile={requestProject.userProfile}
            userEmail={requestProject.userEmail}
            requestProjectId={requestProject.requestProjectId}
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

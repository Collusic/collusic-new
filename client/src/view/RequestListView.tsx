import React from "react";

import { User } from "../types/userType";
import { RequestProjectType } from "../types/requestProjectType";
import { RequestProjectView } from "./RequestProjectView";
import "../utils/style/RequestList.scss";

type RequestListProps = {
  requestList: Array<User & RequestProjectType>;
  onClickRedirectHandler(e: React.MouseEvent<HTMLButtonElement>): void;
};

export const RequestListView: React.FC<RequestListProps> = ({
  requestList,
  onClickRedirectHandler,
}) => {
  return (
    <article className="project-list">
      {requestList.map((requestProject) => {
        return (
          <RequestProjectView
            key={requestProject.id}
            userProfile={requestProject.userProfile}
            userEmail={requestProject.userEmail}
            id={requestProject.id}
            title={requestProject.title}
            fields={requestProject.fields}
            genres={requestProject.genres}
            moods={requestProject.moods}
            lyrics={requestProject.lyrics}
            instrument={requestProject.instrument}
            melody={requestProject.melody}
            onClickRedirectHandler={onClickRedirectHandler}
          ></RequestProjectView>
        );
      })}
    </article>
  );
};

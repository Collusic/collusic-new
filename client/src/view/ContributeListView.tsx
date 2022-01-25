import React from "react";

import { ContributeProject } from "../types/contributeProjectType";
import { User } from "../types/userType";
import { requestStates } from "../utils/requestStates";
import "../utils/style/contributeList.scss";

type ContributeListProps = {
  contributeList: Array<User & ContributeProject>;
};

export const ContributeListView: React.FC<ContributeListProps> = ({
  contributeList,
}) => {
  return (
    <article className="contributeList-box">
      {contributeList.map((project, idx) => (
        <section className="contribute-project" key={idx}>
          <img
            src={
              project.userProfile !== ""
                ? project.userProfile
                : `../../assets/defaultProfile/defaultProfile.png`
            }
            alt={project.userEmail}
            className="profile"
          />
          <section className="email">{project.userDetail}</section>
          <section className="field">{project.contributeField}</section>
          <section className="upload">
            {project.contributeField.map((key, idx) => {
              return requestStates(
                idx,
                project.contributeMelody!,
                project.contributeInstrument!,
                project.contributeLyric!
              )[key];
            })}
          </section>
        </section>
      ))}
    </article>
  );
};

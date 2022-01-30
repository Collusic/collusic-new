import React from "react";

import { ContributeProject } from "../types/contributeProjectType";
import { User } from "../types/userType";
import { requestStates } from "../utils/requestStates";
import "../utils/style/contributeList.scss";

type ContributeListProps = {
  contributeList: Array<User & ContributeProject>;
  onClickHandler(e: React.MouseEvent<HTMLButtonElement> | any): void;
};

export const ContributeListView: React.FC<ContributeListProps> = ({
  contributeList,
  onClickHandler,
}) => {
  console.log(contributeList);
  return (
    <article className="contributeList-box">
      <div className="menu">
        <div className="track-list">Track list</div>
        <div className="contribute-button" onClick={onClickHandler}>
          기여하기
        </div>
      </div>
      {contributeList.map((project, idx) => (
        <section className="contribute-project" key={idx}>
          <img
            src={
              project.userProfile !== undefined
                ? project.userProfile
                : `../../assets/defaultProfile/defaultProfile.png`
            }
            alt={project.userEmail}
            className="profile"
          />
          <section className="email">
            {" "}
            {project.userEmail !== undefined
              ? project.userEmail
              : "sunghyuk1609@gmail.com"}
          </section>
          <section className="field">{project.fields}</section>
          <section className="upload">
            {project.fields.map((key, idx) => {
              return requestStates(
                idx,
                project.melody!,
                project.instrument!,
                project.lyrics!
              )[key];
            })}
          </section>
        </section>
      ))}
    </article>
  );
};

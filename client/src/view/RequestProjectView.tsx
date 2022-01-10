import React from "react";
import { RequestProjectType } from "../types/requestProjectType";
import { User } from "../types/userType";

type RequestProjectProps = User & RequestProjectType;

export const RequestProjectView: React.FC<RequestProjectProps> = ({
  userProfile,
  userEmail,
  requestTitle,
  requestField,
  requestGenre,
  requestMood,
  upload,
}) => {
  return (
    <section className="reqeustBox">
      <section className="user">
        <img src={userProfile} alt={userEmail} className="profile" />
        <div className="email">{userEmail}</div>
      </section>
      <section className="title">{requestTitle}</section>
      <section className="field">
        {requestField.map((field) => (
          <img src={field} alt="" />
        ))}
      </section>
      <section className="genre_mood">
        <section className="genre">
          {requestGenre.map((genre) => (
            <div>{genre}</div>
          ))}
        </section>
        <section className="mood">
          {requestMood.map((mood) => (
            <div>{mood}</div>
          ))}
        </section>
      </section>
      <section className="upload">{upload}</section>
    </section>
  );
};

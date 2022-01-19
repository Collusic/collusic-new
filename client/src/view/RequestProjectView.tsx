import React from "react";
import "./RequestProject.scss";
import { RequestProjectType } from "../types/requestProjectType";
import { User } from "../types/userType";
import { requestStates } from "../utils/requestStates";

type RequestProjectProps = User & RequestProjectType;

export const RequestProjectView: React.FC<RequestProjectProps> = ({
  requestProjectId,
  userProfile,
  userEmail,
  requestTitle,
  requestField,
  requestGenre,
  requestMood,
  requestMelody,
  requestInstrument,
  requestLyric,
}) => {
  return (
    <section className="requestBox" key={requestProjectId}>
      <section className="user">
        <img
          src={
            userProfile !== ""
              ? userProfile
              : `../../assets/defaultProfile/defaultProfile.png`
          }
          alt={userEmail}
          className="profile"
        />
        <div className="email">{userEmail}</div>
      </section>
      <section className="title">{requestTitle}</section>
      <section className="field">
        {requestField.map((field) => (
          <img src={`../../assets/${field}/${field}.png`} alt={field} />
        ))}
      </section>
      <section className="genre_mood">
        <section className="genre">
          <div id="genreTag">장르</div>
          {requestGenre.map((genre, idx) => (
            <div key={idx}>{genre}</div>
          ))}
        </section>
        <section className="mood">
          <div id="moodTag">분위기</div>
          {requestMood.map((mood, idx) => (
            <div key={idx}>{mood}</div>
          ))}
        </section>
      </section>
      <section className="upload">
        {requestField.map((key, idx) => {
          return requestStates(
            idx,
            requestMelody!,
            requestInstrument!,
            requestLyric!
          )[key];
        })}
      </section>
    </section>
  );
};

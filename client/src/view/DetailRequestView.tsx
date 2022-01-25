import React from "react";

import "../utils/style/detailRequest.scss";
import { RequestProjectType } from "../types/requestProjectType";
import { User } from "../types/userType";
import { requestStates } from "../utils/requestStates";

type DetailRequestProps = User & RequestProjectType;

export const DetailRequestView: React.FC<DetailRequestProps> = ({
  userEmail,
  userDetail,
  userProfile,
  requestField,
  requestGenre,
  requestMood,
  requestTitle,
  requestContent,
  requestInstrument,
  requestLyric,
  requestMelody,
}) => {
  return (
    <article className="requestBox">
      <article className="request">
        <section className="title">{requestTitle}</section>
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
        <section className="field_genre_mood">
          <section className="field">
            <div id="fieldTag">요청 분야</div>
            {requestField.map((field, idx) => field)}
          </section>
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
        <section className="content">{requestContent}</section>
      </article>
      <article className="user">
        <img
          src={
            userProfile !== ""
              ? userProfile
              : `../../assets/defaultProfile/defaultProfile@3x.png`
          }
          alt={userEmail}
          className="profile"
        />

        <section className="user-info">
          <div className="email">{userEmail}</div>
          <div className="detail">{userDetail}</div>
        </section>
      </article>
    </article>
  );
};

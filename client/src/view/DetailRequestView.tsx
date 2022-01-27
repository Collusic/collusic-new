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
  fields,
  genres,
  moods,
  title,
  content,
  instrument,
  lyrics,
  melody,
}) => {
  return (
    <article className="requestBox">
      <article className="request">
        <section className="title">{title}</section>
        <section className="upload">
          {fields.map((key, idx) => {
            return requestStates(idx, melody!, instrument!, lyrics!)[key];
          })}
        </section>
        <section className="field_genre_mood">
          <section className="field">
            <div id="fieldTag">요청 분야</div>
            {fields.map((field, idx) => field)}
          </section>
          <section className="genre">
            <div id="genreTag">장르</div>
            {genres.map((genre, idx) => (
              <div key={idx}>{genre}</div>
            ))}
          </section>
          <section className="mood">
            <div id="moodTag">분위기</div>
            {moods.map((mood, idx) => (
              <div key={idx}>{mood}</div>
            ))}
          </section>
        </section>
        <section className="content">{content}</section>
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

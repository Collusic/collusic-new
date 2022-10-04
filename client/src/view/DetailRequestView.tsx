import React from "react";

import "../utils/style/detailRequest.scss";
import type { RequestProjectType } from "../types/requestProjectType";
import type { User } from "../types/userType";
import { requestStates } from "../utils/requestStates";
import Audio from "../components/blocks/Audio";

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
  lyrics,
  uploadFilePath,
}) => {
  return (
    <article className="detailRequestBox">
      <article className="request">
        <section className="title">{title}</section>
        <section className="upload">
          {uploadFilePath != undefined ? (
            <Audio src={uploadFilePath!} key={uploadFilePath} />
          ) : (
            <div className="lyrics">{lyrics}</div>
          )}
        </section>
        <section className="field_genre_mood">
          <section className="field">
            <div id="fieldTag">요청 분야</div>
            {fields.map((field, idx) => (
              <span key={idx}>{field}</span>
            ))}
          </section>
          <section className="genre">
            <div id="genreTag">장르</div>
            {genres.map((genre, idx) => (
              <span key={idx}>{genre}</span>
            ))}
          </section>
          <section className="mood">
            <div id="moodTag">분위기</div>
            {moods.map((mood, idx) => (
              <span key={idx}>{mood}</span>
            ))}
          </section>
        </section>
        <section className="content">{content}</section>
      </article>
      <article className="user">
        <img
          src={
            userProfile !== undefined
              ? userProfile
              : `../../assets/defaultProfile/defaultProfile@3x.png`
          }
          alt={userProfile}
          className="profile"
        />

        <section className="user-info">
          <div className="email">
            {userEmail !== undefined ? userEmail : "sunghyuk1609@gmail.com"}
          </div>
          <div className="detail">
            {userDetail !== undefined
              ? userDetail
              : "대한민국 최고의 작사가를 꿈꾸는 김성혁입니다."}
          </div>
        </section>
      </article>
    </article>
  );
};

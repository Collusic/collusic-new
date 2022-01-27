import React from "react";
import "../utils/style/RequestProject.scss";
import { RequestProjectType } from "../types/requestProjectType";
import { User } from "../types/userType";
import { Audio } from "../components/Audio";

type RequestProjectProps = User & RequestProjectType;
type redirectHandler = {
  onClickRedirectHandler(e: React.MouseEvent<HTMLButtonElement>): void;
};

export const RequestProjectView: React.FC<
  RequestProjectProps & redirectHandler
> = ({
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
  onClickRedirectHandler,
}) => {
  return (
    <section
      className="requestBox"
      key={requestProjectId}
      id={String(requestProjectId)}
      // onClick={onClickRedirectHandler}
    >
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
        {requestField.map((field, idx) => (
          <img
            src={`../../assets/${field}/${field}.png`}
            alt={field}
            key={idx}
          />
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
        {console.log(requestInstrument)}
        {requestInstrument !== undefined ? (
          <Audio src={requestInstrument!} key={requestProjectId} />
        ) : (
          <div>{requestLyric}</div>
        )}
      </section>
    </section>
  );
};

import React from "react";
import "../utils/style/RequestProject.scss";
import { RequestProjectType } from "../types/requestProjectType";
import { User } from "../types/userType";
import Audio from "../components/Audio";

type RequestProjectProps = User & RequestProjectType;
type redirectHandler = {
  onClickRedirectHandler(e: React.MouseEvent<HTMLButtonElement>): void;
};

export const RequestProjectView: React.FC<
  RequestProjectProps & redirectHandler
> = ({
  id,
  userProfile,
  userEmail,
  title,
  fields,
  genres,
  moods,
  uploadFilePath,
  lyrics,
  onClickRedirectHandler,
}) => {
  return (
    <section
      className="requestBox"
      key={id}
      id={String(id)}
      onClick={onClickRedirectHandler}
    >
      <section className="user">
        <img
          src={
            userProfile !== undefined
              ? userProfile
              : `../../assets/defaultProfile/defaultProfile.png`
          }
          alt={userEmail}
          className="profile"
        />
        <div className="email">{userEmail}</div>
      </section>
      <section className="title">{title}</section>
      <section className="field">
        {fields.map((field, idx) => (
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
      <section className="upload">
        {uploadFilePath != undefined ? (
          <Audio src={uploadFilePath!} key={id} />
        ) : (
          <div>{lyrics}</div>
        )}
      </section>
    </section>
  );
};

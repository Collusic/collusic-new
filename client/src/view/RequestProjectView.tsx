import React from "react";
import IrequestStates from "../interfaces/IrequestStates";
import { RequestProjectType } from "../types/requestProjectType";
import { User } from "../types/userType";

type RequestProjectProps = User & RequestProjectType;

const requestStates = (
  melodySrc: string,
  instrumentSrc: string,
  lyric: string
) => {
  return {
    melody: (): JSX.Element => {
      return <audio src={melodySrc}></audio>;
    },

    instrument: (): JSX.Element => {
      return <audio src={instrumentSrc}></audio>;
    },

    lyric: (): JSX.Element => {
      return <div>{lyric}</div>;
    },
  };
};

export const RequestProjectView: React.FC<RequestProjectProps> = ({
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
      <section className="upload">
        {requestField.map(
          (key) =>
            requestStates(requestMelody!, requestInstrument!, requestLyric!)[
              key
            ]
        )}
      </section>
    </section>
  );
};

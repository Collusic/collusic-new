import React from "react";

import "../utils/style/create.scss";

type CreateMoodProps = {
  moods: string[];
  onClickMoodHandler(e: React.MouseEvent<HTMLDivElement>): void;
};

export const CreateMoodView: React.FC<CreateMoodProps> = ({
  moods,
  onClickMoodHandler,
}) => (
  <section className="box">
    <section className="text">분위기</section>
    <section className="button-box">
      {moods.map((mood, idx) => (
        <div className="button" onClick={onClickMoodHandler} key={idx}>
          {mood}
        </div>
      ))}
    </section>
  </section>
);

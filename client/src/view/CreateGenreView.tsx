import React from "react";

import "../utils/style/create.scss";

type CreateGenreProps = {
  genres: string[];
  onClickGenreHandler(e: React.MouseEvent<HTMLDivElement>): void;
};

export const CreateGenreView: React.FC<CreateGenreProps> = ({
  genres,
  onClickGenreHandler,
}) => (
  <section className="box">
    <section className="text">장르</section>
    <section className="button-box">
      {genres.map((genre, idx) => (
        <div className="button" onClick={onClickGenreHandler} key={idx}>
          {genre}
        </div>
      ))}
    </section>
  </section>
);

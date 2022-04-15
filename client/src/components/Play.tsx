import React from "react";

type PlayProps = {
  handleClick(): void;
};

export const Play: React.FC<PlayProps> = ({ handleClick }) => {
  return (
    <button className="player__button" onClick={(e) => {
      e.stopPropagation();
      handleClick();
      }
    }>
      <img src="../assets/play/play.png" alt="play버튼" />
    </button>
  );
};

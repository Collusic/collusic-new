import React from "react";

type PauseProps = {
  handleClick(): void;
};

export const Pause: React.FC<PauseProps> = ({ handleClick }) => {
  return (
    <button className="player__button" onClick={() => handleClick()}>
      <img src="../assets/pause/pause.png" alt="일시정지버튼" />
    </button>
  );
};

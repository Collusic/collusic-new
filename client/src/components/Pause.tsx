import React from "react";

import { stopEventBubbling } from "../utils/eventHandler";


type PauseProps = {
  handleClick(): void;
};

export const Pause: React.FC<PauseProps> = ({ handleClick }) => {
  return (
    <button className="player__button" onClick={(e) => {
      stopEventBubbling(e);
      handleClick();
    }}>
      <img src="../assets/pause/pause.png" alt="일시정지버튼" />
    </button>
  );
};

import React from "react";

import { stopEventBubbling } from "../../../utils/eventHandler";

type PlayProps = {
  handleClick(): void;
};

export const PlayButton: React.FC<PlayProps> = ({ handleClick }) => {
  return (
    <button
      className="player__button"
      onClick={(e) => {
        stopEventBubbling(e);
        handleClick();
      }}
    >
      <img src="../assets/play/play.png" alt="play버튼" />
    </button>
  );
};

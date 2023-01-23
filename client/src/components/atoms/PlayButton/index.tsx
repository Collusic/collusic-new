import React, { MouseEvent } from "react";

import "./style.scss";

export interface PlayButtonProps {
  isPlaying: boolean;
  isFromMain?: boolean;
  onClickPlay(e: MouseEvent): void;
}
function PlayButton({ isPlaying, isFromMain, onClickPlay }: PlayButtonProps) {
  return (
    <button type="button" className="play-button" onClick={onClickPlay}>
      {isFromMain ? (
        <div className="play-icon">
          <img src={`${process.env.PUBLIC_URL}/assets/play/${!isPlaying ? "play.png" : "pause.png"}`} alt="" />
        </div>
      ) : (
        <div className="under-play-icon">
          <img
            src={`${process.env.PUBLIC_URL}/assets/play/${isPlaying ? "under_play.png" : "under_pause.png"}`}
            alt=""
          />
        </div>
      )}
      {isFromMain && <span>Play Now</span>}
    </button>
  );
}

PlayButton.defaultProps = {
  isFromMain: true,
};

export default PlayButton;

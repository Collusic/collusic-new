import React, { MouseEvent } from "react";

import "./style.scss";

interface PreviewButtonProps {
  isPlaying: boolean;
  onClickPreview(e: MouseEvent): void;
}
function PreviewButton({ isPlaying, onClickPreview }: PreviewButtonProps) {
  return (
    <button type="button" id="preview-button" onClick={onClickPreview}>
      <div id="preview-icon">
        <img src={`${process.env.PUBLIC_URL}/assets/preview/${!isPlaying ? "play.png" : "pause.png"}`} alt="" />
      </div>
      <span>Play Now</span>
    </button>
  );
}

export default PreviewButton;

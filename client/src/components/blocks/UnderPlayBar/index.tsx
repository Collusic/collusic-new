import { FormEventHandler } from "react";

import PlayButton, { PlayButtonProps } from "components/atoms/PlayButton";
import SoundBar from "components/blocks/SoundBar";
import "./style.scss";

export interface PlayStatus {
  sound: number;
  currentTime: string;
  totalTime: string;
  onSoundInput: FormEventHandler;
}

function UnderPlayBar({
  sound,
  currentTime,
  totalTime,
  onSoundInput,
  isPlaying,
  onClickPlay,
}: PlayStatus & PlayButtonProps) {
  return (
    <div id="under-play-bar">
      <SoundBar targetState={sound} onSoundInput={onSoundInput} />
      <PlayButton isPlaying={isPlaying} isFromMain={false} onClickPlay={onClickPlay} />
      <div id="play-status">
        <span id="time">
          {currentTime} / {totalTime}
        </span>
      </div>
    </div>
  );
}

export default UnderPlayBar;

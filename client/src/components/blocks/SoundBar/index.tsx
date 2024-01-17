import { FormEvent, FormEventHandler } from "react";

import Bar from "components/atoms/Bar";
import "./style.scss";

interface SoundBarProps {
  targetState: number;
  onSoundInput: FormEventHandler;
}

function SoundBar({ targetState, onSoundInput }: SoundBarProps) {
  return (
    <div id="sound-bar">
      <img src={`${process.env.PUBLIC_URL}/assets/sound/sound_down.png`} alt="" />
      <Bar min={0} max={10} targetState={targetState} isShowTarget={false} onBarInput={onSoundInput} type="sound" />
      <img src={`${process.env.PUBLIC_URL}/assets/sound/sound_up.png`} alt="" />
    </div>
  );
}

export default SoundBar;

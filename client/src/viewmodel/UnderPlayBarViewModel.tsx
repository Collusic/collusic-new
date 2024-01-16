import { useRecoilValue } from "recoil";

import { INITIAL_AUDIO_VOLUME } from "constants/audio";
import { timeState as trackTimeState } from "model/audioModel";
import useAudios from "hooks/useAudios";

import UnderPlayBar from "components/blocks/UnderPlayBar";

function UnderPlayBarViewModel() {
  const { isAudioPlaying, toggleAudio, chanegeAudioVolume } = useAudios();
  const time = useRecoilValue(trackTimeState);
  const refinedTime = `00:${Math.floor(time).toString().padStart(2, "0")}`;

  return (
    <UnderPlayBar
      sound={INITIAL_AUDIO_VOLUME}
      currentTime={refinedTime}
      totalTime="00:30"
      onSoundInput={chanegeAudioVolume}
      isPlaying={isAudioPlaying}
      onClickPlay={toggleAudio}
    />
  );
}

export default UnderPlayBarViewModel;

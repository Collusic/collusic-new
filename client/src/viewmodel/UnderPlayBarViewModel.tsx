import { useRecoilValue } from "recoil";

import { INITIAL_AUDIO_VOLUME } from "constants/audio";
import { timeState as trackTimeState } from "model/audioModel";
import useAudios from "hooks/useAudios";

import UnderPlayBar from "components/blocks/UnderPlayBar";

function UnderPlayBarViewModel({ isRecording }: { isRecording?: boolean }) {
  const { isAudioPlaying, toggleAudio, chanegeAudioVolume } = useAudios();
  const time = useRecoilValue(trackTimeState);
  const refinedTime = `00:${Math.floor(time).toString().padStart(2, "0")}`;

  // 녹음 중이면 오디오 재생상태 조작 불가능
  const handlePlayButtonClick = () => {
    if (!isRecording) {
      toggleAudio();
    }
  };

  return (
    <UnderPlayBar
      sound={INITIAL_AUDIO_VOLUME}
      currentTime={refinedTime}
      totalTime="00:30"
      onSoundInput={chanegeAudioVolume}
      isPlaying={isAudioPlaying}
      onClickPlay={handlePlayButtonClick}
    />
  );
}

UnderPlayBarViewModel.defaultProps = {
  isRecording: false,
};

export default UnderPlayBarViewModel;

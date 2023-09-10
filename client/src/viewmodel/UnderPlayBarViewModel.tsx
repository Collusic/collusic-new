import UnderPlayBar from "components/blocks/UnderPlayBar";

import useAudios from "hooks/useAudios";

function UnderPlayBarViewModel() {
  const { time, onVolumeChange, isPlaying, toggle } = useAudios();

  const refinedTime = `00:${Math.floor(time).toString().padStart(2, "0")}`;

  return (
    <UnderPlayBar
      sound={50}
      currentTime={refinedTime}
      totalTime="00:30"
      onSoundInput={onVolumeChange}
      isPlaying={isPlaying}
      onClickPlay={toggle}
    />
  );
}

export default UnderPlayBarViewModel;

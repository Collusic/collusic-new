import useAudios from "hooks/useAudios";
import UnderPlayBar from "components/blocks/UnderPlayBar";

interface UnderPlayBarViewModelProps {
  currentTime?: number;
}

function UnderPlayBarViewModel({ currentTime }: UnderPlayBarViewModelProps) {
  const { time, onVolumeChange, isPlaying, toggle } = useAudios();

  const refineTime = `00:${Math.floor(currentTime || time)
    .toString()
    .padStart(2, "0")}`;

  return (
    <UnderPlayBar
      sound={50}
      currentTime={refineTime}
      totalTime="00:30"
      onSoundInput={onVolumeChange}
      isPlaying={isPlaying}
      onClickPlay={toggle}
    />
  );
}

UnderPlayBarViewModel.defaultProps = {
  currentTime: undefined,
};

export default UnderPlayBarViewModel;

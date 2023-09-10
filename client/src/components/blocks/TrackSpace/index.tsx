import { AudioType } from "types/audioType";

import TopTimeBox from "components/blocks/TopTimeBox";
import TrackPlayer from "components/blocks/TrackPlayer";

import useAudios from "hooks/useAudios";

import "./style.scss";

interface Props {
  bpm: number;
  isRecording?: boolean;
  isRecordSuccess?: boolean;
  onRecord?: () => void;
  onTrackRemove?: (audioId: AudioType["id"]) => void;
}

function TrackSpace({ bpm = 0, isRecording, isRecordSuccess, onRecord, onTrackRemove }: Props) {
  const { time: currentTime, setTime: setCurrentTime, audioList: audioTracks } = useAudios();

  return (
    <div id="track-space">
      <TopTimeBox bpm={bpm} />
      <TrackPlayer
        bpm={bpm}
        time={currentTime}
        audioTracks={audioTracks}
        setTime={setCurrentTime}
        isRecording={isRecording}
        isRecordSuccess={isRecordSuccess}
        onRecord={onRecord}
        onTrackRemove={onTrackRemove}
      />
    </div>
  );
}

TrackSpace.defaultProps = {
  isRecording: false,
  isRecordSuccess: false,
  onRecord: undefined,
  onTrackRemove: undefined,
};

export default TrackSpace;

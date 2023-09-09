import { AudioType } from "types/audioType";
import TopTimeBox from "../TopTimeBox";
import TrackPlayer from "../TrackPlayer";
// import { TrackPlayerProps } from "../../../types/trackType";

import "./style.scss";

interface Props {
  bpm: number;
  currentTime: number;
  audioTracks: AudioType[];
  setCurrentTime: (prev: number) => void;
  isRecording: boolean;
  isRecordSuccess: boolean;
  onRecord: () => void;
  onTrackRemove: (audioId: AudioType["id"]) => void;
}

function TrackSpace({
  bpm = 0,
  currentTime,
  audioTracks,
  setCurrentTime,
  isRecording,
  isRecordSuccess,
  onRecord,
  onTrackRemove,
}: Props) {
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

export default TrackSpace;

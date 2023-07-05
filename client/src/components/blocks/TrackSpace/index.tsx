import TopTimeBox from "../TopTimeBox";
import TrackPlayer from "../TrackPlayer";

import "./style.scss";

interface Props {
  bpm: number;
  currentTime: number;
  audioTracks: HTMLAudioElement[];
  setCurrentTime: (prev: number) => void;
  isRecording: boolean;
  isRecordSuccess: boolean;
  onRecord: () => void;
}

function TrackSpace({
  bpm = 0,
  currentTime,
  audioTracks,
  setCurrentTime,
  isRecording,
  isRecordSuccess,
  onRecord,
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
      />
    </div>
  );
}

export default TrackSpace;

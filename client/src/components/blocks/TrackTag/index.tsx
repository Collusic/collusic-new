import { MouseEventHandler } from "react";

import Button from "components/atoms/Button";
import { SelectedTrackSrc, UnselectedTrackSrc } from "utils/data/track";
import { Track } from "types/projectType";
import "./style.scss";
import Span from "components/atoms/Span";

// todo: recorder.svg 에러

interface TrackTagProps {
  onTrackClick: MouseEventHandler;
  selectedTrack: Track;
  tracks: Track[];
}

function TrackTag({ onTrackClick, selectedTrack, tracks }: TrackTagProps) {
  const getTrackSrc = (isSelected: boolean, track: Track): string => {
    if (isSelected) return SelectedTrackSrc[track];
    return UnselectedTrackSrc[track];
  };

  return (
    <div id="track-tag">
      <Span>트랙 태그</Span>
      <div id="track-tag-list">
        {tracks.map((track) => (
          <Button
            key={track}
            type="line"
            isSelected={selectedTrack === track}
            onBtnClick={onTrackClick}
            imgSrc={track === "ETC" ? undefined : getTrackSrc(selectedTrack === track, track)}
            marginLeft="8px"
            marginTop="10px"
          >
            {track}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default TrackTag;

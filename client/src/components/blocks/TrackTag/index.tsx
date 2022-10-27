import React, { MouseEventHandler } from "react";

import Button from "components/atoms/Button";
import { SelectedTrackSrc, UnselectedTrackSrc } from "utils/data/trackSrc";
import { Track } from "types/projectType";
import "./style.scss";

// todo: recorder.svg 에러

interface TrackTagProps {
  handleBtnClick: MouseEventHandler;
  selectedTrack: Track;
  tracks: Track[];
}

function TrackTag({ handleBtnClick, selectedTrack, tracks }: TrackTagProps) {
  const getTrackSrc = (isSelected: boolean, track: Track): string => {
    if (isSelected) return SelectedTrackSrc[track];
    return UnselectedTrackSrc[track];
  };

  return (
    <div id="track-tag">
      {tracks.map((track) => (
        <Button
          key={track}
          type="line"
          isSelected={selectedTrack === track}
          onBtnClick={handleBtnClick}
          svgSrc={track === "ETC" ? undefined : getTrackSrc(selectedTrack === track, track)}
          marginLeft="8px"
          marginTop="10px"
        >
          {track}
        </Button>
      ))}
    </div>
  );
}

export default TrackTag;

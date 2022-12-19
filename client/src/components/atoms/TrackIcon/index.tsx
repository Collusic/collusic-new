import React from "react";

import { TrackIconSrc } from "utils/data/track";
import { Track } from "types/projectType";
import "./style.scss";

interface TrackIconProps {
  track: Track;
  style: {};
}
function TrackIcon({ track, style }: TrackIconProps) {
  return (
    <div id="track-icon" style={style}>
      <img src={TrackIconSrc[track]} alt={track} />
    </div>
  );
}

export default TrackIcon;

import React from "react";

import { TrackIconSrc } from "../../../utils/data/track";
import { Track } from "../../../types/projectType";
import "./style.scss";

interface TrackIconProps {
  track: Track;
}
function TrackIcon({ track }: TrackIconProps) {
  return (
    <div id="track-icon">
      <img src={TrackIconSrc[track]} alt={track} />
    </div>
  );
}

export default TrackIcon;

import React from "react";

import { SelectedTrackSrc } from "utils/data/track";
import { Track } from "types/projectType";
import "./style.scss";

interface TrackBoxProps {
  profileUrl: string;
  nickName: string;
  track: Track;
  trackName: string;
}

function TrackBox({ profileUrl, nickName, track, trackName }: TrackBoxProps) {
  return (
    <div className="track-box">
      <div className="top-box">
        <img src={profileUrl} alt="" />
        <span>{nickName}</span>
      </div>
      <div className="bottom-box">
        <img src={SelectedTrackSrc[track]} alt="" />
        <div className="cross-bar" />
        <span>{trackName}</span>
      </div>
    </div>
  );
}

export default TrackBox;

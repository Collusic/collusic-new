import React, { FormEventHandler, KeyboardEventHandler, MouseEventHandler } from "react";

import { Track } from "types/projectType";
import Button from "components/atoms/Button";
import Bpm from "../Bpm";
import RecordDevice from "../RecordDevice";
import TrackTag from "../TrackTag";
import "./style.scss";

interface ProjectSettingProps {
  onDeviceClick: MouseEventHandler<HTMLUListElement> | KeyboardEventHandler<HTMLUListElement>;
  onTrackClick: MouseEventHandler;
  onBtnClick: MouseEventHandler;
  onBpmInput: FormEventHandler;
  bpmState: number;
  selectedTrack: Track;
  tracks: Track[];
}

function ProjectSetting({
  onDeviceClick,
  onTrackClick,
  onBtnClick,
  onBpmInput,
  bpmState,
  selectedTrack,
  tracks,
}: ProjectSettingProps) {
  return (
    <div id="project-setting">
      <div id="setting-box">
        <input className="project-title" type="text" placeholder="프로젝트명" />
        <RecordDevice onDeviceClick={onDeviceClick} />
        <Bpm bpmState={bpmState} onBpmInput={onBpmInput} />
        <TrackTag onTrackClick={onTrackClick} selectedTrack={selectedTrack} tracks={tracks} />
      </div>
      <Button type="green" onBtnClick={onBtnClick} width="20rem" marginTop="5rem">
        프로젝트 생성하기
      </Button>
    </div>
  );
}

export default ProjectSetting;

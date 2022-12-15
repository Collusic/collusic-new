import React, { FormEventHandler, MouseEventHandler } from "react";

import { Track } from "types/projectType";
import Button from "components/atoms/Button";
import Bpm from "../Bpm";
import RecordDevice from "../RecordDevice";
import TrackTag from "../TrackTag";
import "./style.scss";

interface ProjectSettingProps {
  onDeviceClick: (deviceId: string, deviceName: string) => void;
  onTrackClick: MouseEventHandler;
  onBtnClick: MouseEventHandler;
  onBpmInput: FormEventHandler;
  onTitleInput: FormEventHandler;
  bpmState: number;
  selectedTrack: Track;
  tracks: Track[];
  inputTextDevice: string;
}

function ProjectSetting({
  onDeviceClick,
  onTrackClick,
  onBtnClick,
  onBpmInput,
  onTitleInput,
  bpmState,
  selectedTrack,
  tracks,
  inputTextDevice,
}: ProjectSettingProps) {
  return (
    <div id="project-setting">
      <div id="setting-box">
        <input className="project-title" onInput={onTitleInput} type="text" placeholder="프로젝트명" />
        <RecordDevice onDeviceClick={onDeviceClick} inputTextDevice={inputTextDevice} />
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

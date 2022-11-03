import React, { FormEventHandler, KeyboardEventHandler, MouseEventHandler } from "react";

import { MelodyLength, Track } from "types/projectType";
import Button from "components/atoms/Button";
import Toggle from "components/atoms/Toggle";
import Bpm from "../Bpm";
import RecordDevice from "../RecordDevice";
import SessionMelody from "../SessionMelody";
import TrackTag from "../TrackTag";
import "./style.scss";

interface ProjectSettingProps {
  onDeviceClick: MouseEventHandler<HTMLUListElement> | KeyboardEventHandler<HTMLUListElement>;
  onSessionMelodyClick: MouseEventHandler;
  onTrackClick: MouseEventHandler;
  onToggleClick: MouseEventHandler;
  onBtnClick: MouseEventHandler;
  onBpmInput: FormEventHandler;
  melodyType: MelodyLength;
  bpmState: number;
  selectedTrack: Track;
  tracks: Track[];
  isLocked: boolean;
  isSelected: boolean;
}

function ProjectSetting({
  onDeviceClick,
  onSessionMelodyClick,
  onTrackClick,
  onToggleClick,
  onBtnClick,
  onBpmInput,
  melodyType,
  bpmState,
  selectedTrack,
  tracks,
  isLocked,
  isSelected,
}: ProjectSettingProps) {
  return (
    <div id="project-setting">
      <RecordDevice onDeviceClick={onDeviceClick} />
      <SessionMelody melodyType={melodyType} onSessionMelodyClick={onSessionMelodyClick} />
      <Bpm bpmState={bpmState} onBpmInput={onBpmInput} />
      <TrackTag onTrackClick={onTrackClick} selectedTrack={selectedTrack} tracks={tracks} />
      <Toggle isLocked={isLocked} onToggleClick={onToggleClick} />
      <Button type="green" isSelected={isSelected} onBtnClick={onBtnClick}>프로젝트 수정하기</Button>
    </div>
  );
}

export default ProjectSetting;

import { Dispatch, FormEventHandler, MouseEventHandler, SetStateAction, useRef } from "react";

import { Track } from "types/projectType";
import { AudioType } from "types/audioType";
import Button from "components/atoms/Button";
import Bpm from "components/blocks/BpmBar";
import RecordDevice from "../RecordDevice";
import TrackTag from "../TrackTag";
import TrackSpace from "../TrackSpace";
import UnderPlayBar from "../UnderPlayBar";

import "./style.scss";

interface ProjectSettingProps {
  onDeviceClick: (deviceId: string, deviceName: string) => void;
  onTrackClick: MouseEventHandler;
  onBtnClick: MouseEventHandler;
  onBpmInput: FormEventHandler;
  onTitleInput: FormEventHandler;
  onRecord: () => void;
  onVolumeChange: (value: number) => void;
  onTrackRemove: (audioId: AudioType["id"]) => void;
  isRecording: boolean;
  isRecordSuccess: boolean;
  bpmState: number;
  selectedTrackTag: Track;
  trackTags: Track[];
  inputTextDevice: string;
  time: number;
  setTime: (prev: number) => void;
  isAudioPlaying: boolean;
  toggleAudio: () => void;
  audioTracks: AudioType[];
}

function ProjectSetting({
  onDeviceClick,
  onTrackClick,
  onBtnClick,
  onBpmInput,
  onTitleInput,
  onRecord,
  onVolumeChange,
  onTrackRemove,
  isRecording,
  isRecordSuccess,
  bpmState,
  selectedTrackTag,
  trackTags,
  inputTextDevice,
  time,
  setTime,
  isAudioPlaying,
  toggleAudio,
  audioTracks,
}: ProjectSettingProps) {
  return (
    <div id="project-setting">
      <div id="top-section">
        <div id="setting-section">
          <div id="setting-box">
            <input className="project-title" onInput={onTitleInput} type="text" placeholder="프로젝트명" />
            <RecordDevice onDeviceClick={onDeviceClick} inputTextDevice={inputTextDevice} />
            <Bpm bpmState={bpmState} onBpmInput={onBpmInput} />
            <TrackTag onTrackClick={onTrackClick} selectedTrack={selectedTrackTag} tracks={trackTags} />
          </div>
          <Button type="green" onBtnClick={onBtnClick} marginTop="5rem" width="100%">
            프로젝트 생성하기
          </Button>
        </div>
        <TrackSpace
          bpm={bpmState}
          currentTime={time}
          audioTracks={audioTracks}
          setCurrentTime={setTime}
          isRecording={isRecording}
          isRecordSuccess={isRecordSuccess}
          onRecord={onRecord}
          onTrackRemove={onTrackRemove}
        />
      </div>
      <div id="bottom-section">
        <UnderPlayBar
          sound={0}
          currentTime={`00:${Math.floor(time).toString().padStart(2, "0")}`}
          totalTime="00:30"
          onSoundInput={onVolumeChange}
          isPlaying={isAudioPlaying}
          onClickPlay={toggleAudio}
        />
      </div>
    </div>
  );
}

export default ProjectSetting;

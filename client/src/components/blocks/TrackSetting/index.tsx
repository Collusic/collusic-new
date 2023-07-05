import { FormEventHandler, MouseEventHandler, useRef } from "react";

import { Track } from "types/projectType";
import Button from "components/atoms/Button";
import Bpm from "components/atoms/Bpm";
import RecordDevice from "../RecordDevice";
import TrackTag from "../TrackTag";
import TrackSpace from "../TrackSpace";
import UnderPlayBar from "../UnderPlayBar";

import "./style.scss";

interface Props {
  prjectId: number;
  tarckId: number;
  audioTracks: HTMLAudioElement[];
}

interface TrackSettingProps {
  onDeviceClick: (deviceId: string, deviceName: string) => void;
  onBtnClick: MouseEventHandler;
  onTitleInput: FormEventHandler;
  onTrackTagClick: MouseEventHandler;
  onRecord: () => void;
  onVolumeChange: (value: number) => void;
  projectTitle: string;
  bpmState: number;
  selectedTrackTag: Track;
  isRecording: boolean;
  isRecordSuccess: boolean;
  trackTags: Track[];
  inputTextDevice: string;
  audioTracks: HTMLAudioElement[];
  time: number;
  setTime: (value: number) => void;
  isAudioPlaying: boolean;
  toggleAudio: () => void;
}

function TrackSetting({
  onDeviceClick,
  onBtnClick,
  onTitleInput,
  onTrackTagClick,
  onRecord,
  onVolumeChange,
  projectTitle,
  bpmState,
  selectedTrackTag,
  isRecording,
  isRecordSuccess,
  trackTags,
  inputTextDevice,
  audioTracks,
  time,
  setTime,
  isAudioPlaying,
  toggleAudio,
}: TrackSettingProps) {
  return (
    <div id="track-setting">
      <div id="top-section">
        <div className="flex-column">
          <div id="project-info">
            <Bpm bpmState={bpmState} />
            <p>{projectTitle}</p>
          </div>
          <div id="setting-section">
            <div id="setting-box">
              <input className="track-title" onInput={onTitleInput} type="text" placeholder="트랙명" />
              <RecordDevice onDeviceClick={onDeviceClick} inputTextDevice={inputTextDevice} />
              <TrackTag onTrackClick={onTrackTagClick} selectedTrack={selectedTrackTag} tracks={trackTags} />
            </div>
            <Button type="green" onBtnClick={onBtnClick} marginTop="4rem" width="100%">
              트랙 추가하기
            </Button>
          </div>
        </div>
        <TrackSpace
          bpm={bpmState}
          currentTime={time}
          audioTracks={audioTracks}
          setCurrentTime={setTime}
          isRecording={isRecording}
          isRecordSuccess={isRecordSuccess}
          onRecord={onRecord}
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

export default TrackSetting;

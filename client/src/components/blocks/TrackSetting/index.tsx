import { FormEventHandler, MouseEventHandler, useRef } from "react";

import { Track } from "types/projectType";
import { AudioType } from "types/audioType";

import Button from "components/atoms/Button";
import Bpm from "components/atoms/Bpm";
import RecordDevice from "../RecordDevice";
import TrackTag from "../TrackTag";
import TrackSpace from "../TrackSpace";
import UnderPlayBar from "../UnderPlayBar";

import "./style.scss";

import { ProjectSettingProps } from "types/projectType";
import useAudios from "hooks/useAudios";
import UnderPlayBarViewModel from "viewmodel/UnderPlayBarViewModel";

interface TrackSettingProps extends ProjectSettingProps {
  onTrackTagClick: MouseEventHandler;
  onRecord: () => void;
  onVolumeChange: (value: number) => void;
  onTrackRemove: (audioId: AudioType["id"]) => void;
  projectTitle: string;
  bpmState: number;
  selectedTrackTag: Track;
  isRecording: boolean;
  isRecordSuccess: boolean;
  trackTags: Track[];
  inputTextDevice: string;
  audioTracks: AudioType[];
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
  onTrackRemove,
  projectTitle,
  bpmState,
  selectedTrackTag,
  isRecording,
  isRecordSuccess,
  trackTags,
  inputTextDevice,
}: TrackSettingProps) {
  const { time, setTime, audioList } = useAudios();
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
          audioTracks={audioList}
          setCurrentTime={setTime}
          isRecording={isRecording}
          isRecordSuccess={isRecordSuccess}
          onRecord={onRecord}
          onTrackRemove={onTrackRemove}
        />
      </div>
      <div id="bottom-section">
        <UnderPlayBarViewModel currentTime={time} />
      </div>
    </div>
  );
}

export default TrackSetting;

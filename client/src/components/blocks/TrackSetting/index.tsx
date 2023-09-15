import { MouseEventHandler } from "react";
import "./style.scss";

import { ProjectSettingProps } from "types/projectType";
import useAudios from "hooks/useAudios";
import UnderPlayBarViewModel from "viewmodel/UnderPlayBarViewModel";
import Button from "components/atoms/Button";
import Bpm from "components/atoms/Bpm";
import RecordDevice from "components/blocks/RecordDevice";
import TrackTag from "components/blocks/TrackTag";
import TrackSpace from "components/blocks/TrackSpace";

interface TrackSettingProps extends ProjectSettingProps {
  onTrackTagClick: MouseEventHandler;
  projectTitle: string;
}

function TrackSetting({
  onDeviceClick,
  onBtnClick,
  onTitleInput,
  onTrackTagClick,
  onRecord,
  projectTitle,
  bpmState,
  selectedTrackTag,
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
        <TrackSpace bpm={bpmState} time={time} audioTracks={audioList} setTime={setTime} onRecord={onRecord} />
      </div>
      <div id="bottom-section">
        <UnderPlayBarViewModel currentTime={time} />
      </div>
    </div>
  );
}

export default TrackSetting;

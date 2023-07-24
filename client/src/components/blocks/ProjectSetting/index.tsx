import Button from "components/atoms/Button";
import Bpm from "components/blocks/BpmBar";
import RecordDevice from "../RecordDevice";
import TrackTag from "../TrackTag";
import "./style.scss";
import TrackSpace from "../TrackSpace";
import useAudios from "../../../hooks/useAudios";
import { ProjectSettingProps } from "../../../types/projectType";
import UnderPlayBarViewModel from "../../../viewmodel/UnderPlayBarViewModel";

function ProjectSetting({
  onDeviceClick,
  onTrackClick,
  onBtnClick,
  onBpmInput,
  onTitleInput,
  onRecord,
  bpmState,
  selectedTrackTag,
  trackTags,
  inputTextDevice,
}: ProjectSettingProps) {
  const { time, setTime, audioList } = useAudios();

  return (
    <div id="project-setting">
      <div id="top-section">
        <div id="setting-section">
          <div id="setting-box">
            <input className="project-title" onInput={onTitleInput} type="text" placeholder="프로젝트명" />
            <RecordDevice onDeviceClick={onDeviceClick} inputTextDevice={inputTextDevice} />
            {onBpmInput && <Bpm bpmState={bpmState} onBpmInput={onBpmInput} />}
            {onTrackClick && (
              <TrackTag onTrackClick={onTrackClick} selectedTrack={selectedTrackTag} tracks={trackTags} />
            )}
          </div>
          <Button type="green" onBtnClick={onBtnClick} marginTop="5rem" width="100%">
            프로젝트 생성하기
          </Button>
        </div>
        <TrackSpace bpm={bpmState} time={time} audioTracks={audioList} setTime={setTime} onRecord={onRecord} />
      </div>
      <div id="bottom-section">
        <UnderPlayBarViewModel currentTime={time} />
      </div>
    </div>
  );
}

export default ProjectSetting;

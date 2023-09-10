import { Track } from "types/projectType";
import { AudioType } from "types/audioType";
// import { ProjectSettingProps } from "types/projectType";

import Button from "components/atoms/Button";
import Bpm from "components/blocks/BpmBar";
import RecordDevice from "components/blocks/RecordDevice";
import TrackTag from "components/blocks/TrackTag";
import TrackSpace from "components/blocks/TrackSpace";

import UnderPlayBarViewModel from "viewmodel/UnderPlayBarViewModel";

import useProjectSetting from "hooks/useProjectSetting";
import useRecord from "hooks/useRecord";
import useAudios from "hooks/useAudios";

import "./style.scss";

interface ProjectSettingProps {
  onProjectSubmit: (title: string, trackTag: Track, bpm: number) => void;
  trackTags: Track[];
}

function ProjectSetting({ onProjectSubmit, trackTags }: ProjectSettingProps) {
  const {
    title,
    bpm,
    inputDeviceId,
    inputTextDevice,
    trackTag,
    handleTitleInput,
    handleBpmInput,
    handleDeviceClick,
    handleTrackTagSelect,
  } = useProjectSetting();

  const {
    isRecording,
    isSuccess: isRecordSuccess,
    data: recordData,
    streamId: recordKey,
    startRecord,
    initRecord,
  } = useRecord(inputDeviceId);

  const { addAudio, removeAudio } = useAudios();

  const removeTrack = (audioId: AudioType["id"]) => {
    removeAudio(audioId);
    initRecord();
  };

  const handleCreateButtonClick = () => {
    if (!title || !trackTag || !bpm) {
      return;
    }

    onProjectSubmit(title, trackTag, bpm);
  };

  return (
    <div id="project-setting">
      <div id="top-section">
        <div id="setting-section">
          <div id="setting-box">
            <input className="project-title" onInput={handleTitleInput} type="text" placeholder="프로젝트명" />
            <RecordDevice onDeviceClick={handleDeviceClick} inputTextDevice={inputTextDevice} />
            <Bpm bpmState={bpm} onBpmInput={handleBpmInput} />
            <TrackTag onTrackClick={handleTrackTagSelect} selectedTrack={trackTag} tracks={trackTags} />
          </div>
          <Button type="green" onBtnClick={handleCreateButtonClick} marginTop="5rem" width="100%">
            프로젝트 생성하기
          </Button>
        </div>
        <TrackSpace
          bpm={bpm}
          isRecording={isRecording}
          isRecordSuccess={isRecordSuccess}
          onRecord={startRecord}
          onTrackRemove={removeTrack}
        />
      </div>
      <div id="bottom-section">
        <UnderPlayBarViewModel />
      </div>
    </div>
  );
}

export default ProjectSetting;

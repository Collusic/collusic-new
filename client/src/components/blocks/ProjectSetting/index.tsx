import { Track } from "types/projectType";

import Button from "components/atoms/Button";
import Bpm from "components/blocks/BpmBar";
import RecordDevice from "components/blocks/RecordDevice";
import TrackTag from "components/blocks/TrackTag";
import TrackSpace from "components/blocks/TrackSpace";

import UnderPlayBarViewModel from "viewmodel/UnderPlayBarViewModel";

import useAudios from "hooks/useAudios";
import useProjectSetting from "hooks/useProjectSetting";
import useCreateTrack from "hooks/useCreateTrack";
import { NEW_TRACK_ID } from "constants/key";

import "./style.scss";

interface ProjectSettingProps {
  onProjectSubmit: (title: string, trackTag: Track, bpm: number, audio: HTMLAudioElement) => void;
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

  const { addAudio, removeAudio, audioList } = useAudios();

  const { isRecording, isRecordSuccess, handleRecordButtonClick, handleTrackRemove } = useCreateTrack({
    inputDeviceId,
    onReocrdSuccess: (data, key) => {
      const audio = new Audio(URL.createObjectURL(data));
      audio.accessKey = key;
      addAudio(audio);
    },
    onTrackRemove: (audioId) => {
      removeAudio(audioId);
    },
  });

  const handleCreateButtonClick = () => {
    const recordedAudio = audioList.find(({ id }) => id === NEW_TRACK_ID);

    if (!title || !trackTag || !bpm || !recordedAudio) {
      return;
    }

    onProjectSubmit(title, trackTag, bpm, recordedAudio.audio);
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
          onRecord={handleRecordButtonClick}
          onTrackRemove={handleTrackRemove}
        />
      </div>
      <div id="bottom-section">
        <UnderPlayBarViewModel />
      </div>
    </div>
  );
}

export default ProjectSetting;

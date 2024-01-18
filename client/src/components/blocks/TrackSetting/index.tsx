import { useEffect } from "react";

import { Track } from "types/projectType";
import { TrackResponseType } from "types/trackType";

import Button from "components/atoms/Button";
import Bpm from "components/atoms/Bpm";
import RecordDevice from "components/blocks/RecordDevice";
import TrackTag from "components/blocks//TrackTag";
import TrackSpace from "components/blocks//TrackSpace";

import UnderPlayBarViewModel from "viewmodel/UnderPlayBarViewModel";

import useAudios from "hooks/useAudios";
import useTrackSetting from "hooks/useTrackSetting";
import useCreateTrack from "hooks/useCreateTrack";

import "./style.scss";

interface ProjectInfoType {
  projectTitle: string;
  bpmState: number;
  trackTags: Track[];
  tracks: TrackResponseType[];
}

function TrackSetting({ projectTitle, bpmState, trackTags, tracks }: ProjectInfoType) {
  const {
    inputDeviceId,
    inputTextDevice,
    trackTag,
    handleTitleInput,
    handleTrackTagSelect,
    handleDeviceClick,
    handleSettingSubmit,
  } = useTrackSetting();

  const { setAudios, addAudio, removeAudio } = useAudios();

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

  useEffect(() => {
    if (tracks.length === 0) {
      return;
    }

    const audioSourceList = tracks.map(({ trackId, fileUrl }) => ({ id: trackId, source: fileUrl }));
    setAudios(audioSourceList);
  }, [tracks]);

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
              <input className="track-title" onInput={handleTitleInput} type="text" placeholder="트랙명" />
              <RecordDevice onDeviceClick={handleDeviceClick} inputTextDevice={inputTextDevice} />
              <TrackTag onTrackClick={handleTrackTagSelect} selectedTrack={trackTag} tracks={trackTags} />
            </div>
            <Button type="green" onBtnClick={handleSettingSubmit} marginTop="4rem" width="100%">
              트랙 추가하기
            </Button>
          </div>
        </div>
        <TrackSpace
          bpm={bpmState}
          tracks={tracks}
          isRecording={isRecording}
          isRecordSuccess={isRecordSuccess}
          onRecord={handleRecordButtonClick}
          onTrackRemove={handleTrackRemove}
        />
      </div>
      <div id="bottom-section">
        <UnderPlayBarViewModel isRecording={isRecording} />
      </div>
    </div>
  );
}

export default TrackSetting;

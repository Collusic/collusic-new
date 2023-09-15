import { useEffect } from "react";

import { Track } from "types/projectType";
import { TrackResponseType } from "types/trackType";
import { AudioType } from "types/audioType";

import Button from "components/atoms/Button";
import Bpm from "components/atoms/Bpm";
import RecordDevice from "components/blocks/RecordDevice";
import TrackTag from "components/blocks//TrackTag";
import TrackSpace from "components/blocks//TrackSpace";

import UnderPlayBarViewModel from "viewmodel/UnderPlayBarViewModel";

import useTrackSetting from "hooks/useTrackSetting";
import useRecord from "hooks/useRecord";
import useAudios from "hooks/useAudios";
import useTimer from "hooks/useTimer";

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

  const {
    isRecording,
    isSuccess: isRecordSuccess,
    data: recordData,
    streamId: recordKey,
    startRecord,
    stopRecord,
    initRecord,
  } = useRecord(inputDeviceId);

  const { setAudios, addAudio, removeAudio } = useAudios();

  const { start: startTimer, pause: pauseTimer, isExpired, time: timerTime } = useTimer(10);

  const handleRecordButtonClick = () => {
    startRecord();
    startTimer();
  };

  const handleTrackRemove = (audioId: AudioType["id"]) => {
    stopRecord();
    pauseTimer();

    if (window.confirm("녹음된 트랙이 있어요. 정말 삭제할까요?")) {
      initRecord();
      removeAudio(audioId);
    }
  };

  // timer가 종료되면 트랙 녹음 중지
  useEffect(() => {
    if (isExpired) {
      stopRecord();
    }
  }, [isExpired]);

  useEffect(() => {
    console.log(timerTime);
  }, [timerTime]);

  useEffect(() => {
    if (tracks.length === 0) {
      return;
    }

    const audioSourceList = tracks.map(({ trackId, fileUrl }) => ({ id: trackId, source: fileUrl }));
    setAudios(audioSourceList);
  }, [tracks]);

  useEffect(() => {
    if (isRecordSuccess) {
      const audio = new Audio(URL.createObjectURL(recordData));
      audio.accessKey = recordKey;
      addAudio(audio);
    }
  }, [isRecordSuccess]);

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

export default TrackSetting;

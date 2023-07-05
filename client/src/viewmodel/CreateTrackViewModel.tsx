import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProject } from "api/project";
import { trackList as TrackTags } from "utils/data/track";

import useAudios from "hooks/useAudios";
import TrackSetting from "components/blocks/TrackSetting";
import useTrackSetting from "hooks/useTrackSetting";
import { ProjectResponseType } from "types/projectType";
import useRecord from "hooks/useRecord";

function CreateTrackViewModel() {
  const { projectId } = useParams();
  const [projectInfo, setProjectInfo] = useState<ProjectResponseType>();
  const [isLoading, setIsLoading] = useState(false);
  const isFetched = !isLoading && projectInfo;

  const {
    audioList,
    time,
    setTime,
    setAudios,
    addAudio,
    isPlaying: isAudioPlaying,
    toggle: toggleAudio,
    onVolumeChange,
  } = useAudios();

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
  } = useRecord(inputDeviceId);

  useEffect(() => {
    if (!projectId) {
      return;
    }

    const fetchProjectInfo = async () => {
      setIsLoading(true);

      const projectData = await getProject(projectId);
      const audioSourceList = projectData.tracks.map(({ trackId, fileUrl }) => ({ id: trackId, source: fileUrl }));

      setProjectInfo(projectData);
      setAudios(audioSourceList);

      setIsLoading(false);
    };

    fetchProjectInfo();
  }, []);

  useEffect(() => {
    if (isRecordSuccess) {
      const audio = new Audio(URL.createObjectURL(recordData));
      audio.accessKey = recordKey;
      addAudio(audio);
    }
  }, [isRecordSuccess]);

  return isFetched ? (
    <TrackSetting
      onTitleInput={handleTitleInput}
      onDeviceClick={handleDeviceClick}
      onTrackTagClick={handleTrackTagSelect}
      onBtnClick={handleSettingSubmit}
      onRecord={startRecord}
      onVolumeChange={onVolumeChange}
      projectTitle={projectInfo.projectName}
      bpmState={projectInfo.bpm}
      selectedTrackTag={trackTag}
      isRecording={isRecording}
      isRecordSuccess={isRecordSuccess}
      trackTags={TrackTags}
      inputTextDevice={inputTextDevice}
      audioTracks={audioList}
      time={time}
      setTime={setTime}
      isAudioPlaying={isAudioPlaying}
      toggleAudio={toggleAudio}
    />
  ) : (
    <div>Laoding ...</div>
  );
}

export default CreateTrackViewModel;

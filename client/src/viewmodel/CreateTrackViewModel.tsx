import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getProject } from "api/project";
import { trackList as TrackTags } from "utils/data/track";

import useAudios from "hooks/useAudios";
import TrackSetting from "components/blocks/TrackSetting";
import useTrackSetting from "hooks/useTrackSetting";

function CreateTrackViewModel() {
  const { projectId } = useParams();
  const {
    audioList,
    time,
    setTime,
    setAudios,
    isPlaying: isAudioPlaying,
    toggle: toggleAudio,
    onVolumeChange,
  } = useAudios();
  const {
    title,
    inputTextDevice,
    trackTag,
    handleTitleInput,
    handleTrackTagSelect,
    handleDeviceClick,
    handleSettingSubmit,
  } = useTrackSetting();

  useEffect(() => {
    if (!projectId) {
      return;
    }

    getProject(projectId).then(({ bpm, projectName, tracks }) => {
      const sourceList = tracks.map(({ fileUrl }) => fileUrl);
      setAudios(sourceList);
    });
  }, []);

  return (
    <TrackSetting
      onTitleInput={handleTitleInput}
      onDeviceClick={handleDeviceClick}
      onTrackTagClick={handleTrackTagSelect}
      onBtnClick={handleSettingSubmit}
      onRecord={() => {}}
      onVolumeChange={onVolumeChange}
      projectTitle="프로젝트명"
      bpmState={30}
      selectedTrackTag={trackTag}
      trackTags={TrackTags}
      inputTextDevice={inputTextDevice}
      audioTracks={audioList || []}
      time={time}
      setTime={setTime}
      isAudioPlaying={isAudioPlaying}
      toggleAudio={toggleAudio}
    />
  );
}

export default CreateTrackViewModel;

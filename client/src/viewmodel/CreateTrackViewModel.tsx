import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getProject } from "api/project";
import { trackList as TrackTags } from "utils/data/track";

import useAudios from "hooks/useAudios";
import TrackSetting from "components/blocks/TrackSetting";
import useTrackSetting from "hooks/useTrackSetting";

function CreateTrackViewModel() {
  const { projectId } = useParams();
  const { setAudios } = useAudios();
  const { inputTextDevice, trackTag, handleTitleInput, handleTrackTagSelect, handleDeviceClick, handleSettingSubmit } =
    useTrackSetting();

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
      projectTitle="프로젝트명"
      bpmState={30}
      selectedTrackTag={trackTag}
      trackTags={TrackTags}
      inputTextDevice={inputTextDevice}
    />
  );
}

export default CreateTrackViewModel;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ProjectResponseType, Track } from "types/projectType";

import { getProject } from "api/project";
import { addTrack } from "api/track";
import { trackList as TrackTags } from "utils/data/track";
import { getAudioBlob } from "utils/audio";

import TrackSetting from "components/blocks/TrackSetting";

function CreateTrackViewModel() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [projectInfo, setProjectInfo] = useState<ProjectResponseType>();
  const [isLoading, setIsLoading] = useState(false);
  const isFetched = !isLoading && projectInfo;

  // 트랙 생성하기 버튼 클릭
  const handleTrackCreate = (title: string, trackTag: Track, audio: HTMLAudioElement) => {
    if (!projectId) {
      return;
    }

    const createTrack = async () => {
      const recordedBlob = await getAudioBlob(audio);

      const formData = new FormData();
      formData.append("trackName", title);
      formData.append("trackTag", trackTag);
      formData.append("audioFile", recordedBlob);

      await addTrack(projectId, formData);
      navigate(`/${projectId}`);
    };

    createTrack();
  };

  useEffect(() => {
    if (!projectId) {
      return;
    }

    const fetchProjectInfo = async () => {
      setIsLoading(true);

      const projectData = await getProject(projectId);
      setProjectInfo(projectData);

      setIsLoading(false);
    };

    fetchProjectInfo();
  }, []);

  return isFetched ? (
    <TrackSetting
      trackTags={TrackTags}
      projectTitle={projectInfo.projectName}
      bpmState={projectInfo.bpm}
      tracks={projectInfo.tracks}
      onTrackCreate={handleTrackCreate}
    />
  ) : (
    <div>Loading...</div>
  );
}

export default CreateTrackViewModel;

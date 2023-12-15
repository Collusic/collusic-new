import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ProjectResponseType } from "types/projectType";

import { getProject } from "api/project";
import { trackList as TrackTags } from "utils/data/track";

import TrackSetting from "components/blocks/TrackSetting";

function CreateTrackViewModel() {
  const { projectId } = useParams();

  const [projectInfo, setProjectInfo] = useState<ProjectResponseType>();
  const [isLoading, setIsLoading] = useState(false);
  const isFetched = !isLoading && projectInfo;

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
    />
  ) : (
    <div>Loading...</div>
  );
}

export default CreateTrackViewModel;

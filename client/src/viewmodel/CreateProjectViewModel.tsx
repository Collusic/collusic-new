import { useNavigate } from "react-router-dom";

import { Track } from "types/projectType";

import { addProject } from "api/project";
import { trackList as TrackTags } from "utils/data/track";

import ProjectSetting from "components/blocks/ProjectSetting";

function CreateProjectViewModel() {
  const navigate = useNavigate();

  // 프로젝트 생성하기 버튼 클릭
  const handleProjectSubmit = (title: string, trackTag: Track, bpm: number) => {
    const createProject = async () => {
      const data = await addProject({ title, trackTag, bpm });
      navigate(`/detailProject/?id=${data.id}`);
    };

    createProject();
  };

  return <ProjectSetting onProjectSubmit={handleProjectSubmit} trackTags={TrackTags} />;
}

export default CreateProjectViewModel;

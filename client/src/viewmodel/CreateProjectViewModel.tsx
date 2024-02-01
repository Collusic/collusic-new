import { useNavigate } from "react-router-dom";

import { Track } from "types/projectType";

import { addProject } from "api/project";
import { trackList as TrackTags } from "utils/data/track";
import { getAudioBlob } from "utils/audio";

import ProjectSetting from "components/blocks/ProjectSetting";

function CreateProjectViewModel() {
  const navigate = useNavigate();

  // 프로젝트 생성하기 버튼 클릭
  const handleProjectSubmit = (title: string, trackTag: Track, bpm: number, audio: HTMLAudioElement) => {
    const createProject = async () => {
      const recordedBlob = await getAudioBlob(audio);

      const formData = new FormData();
      formData.append("projectName", title);
      formData.append("trackTag", trackTag);
      formData.append("bpm", bpm.toString());
      formData.append("audioFile", recordedBlob);

      const { id } = await addProject(formData);
      navigate(`/${id}`);
    };

    createProject();
  };

  return <ProjectSetting onProjectSubmit={handleProjectSubmit} trackTags={TrackTags} />;
}

export default CreateProjectViewModel;

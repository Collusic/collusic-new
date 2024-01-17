import { RefObject } from "react";

import { ProjectItemProps } from "types/projectType";
import ProjectItemViewModel from "viewmodel/ProjectItemViewModel";
import ObservationTarget from "components/atoms/ObservationTarget";
import "./style.scss";

interface ProjectListProps {
  projectList: ProjectItemProps[];
  currentRef: RefObject<HTMLDivElement>;
}

function ProjectList({ projectList, currentRef }: ProjectListProps) {
  return (
    <div id="project-list">
      {!!projectList.length ? (
        projectList.map((project) => (
          <ProjectItemViewModel
            key={project.projectId}
            projectId={project.projectId}
            projectName={project.projectName}
            trackPreviews={project.trackPreviews}
            likeCount={project.likeCount}
            isLiked={project.isLiked}
          />
        ))
      ) : (
        <div id="no-project">
          <img src={`${process.env.PUBLIC_URL}/assets/no-project/no-project.png`} alt="no project" />
          <span id="title">진행중인 프로젝트가 없습니다.</span>
          <span id="sub-title">첫번째 프로젝트를 생성해보세요.</span>
        </div>
      )}
      <ObservationTarget currentRef={currentRef} />
    </div>
  );
}

export default ProjectList;

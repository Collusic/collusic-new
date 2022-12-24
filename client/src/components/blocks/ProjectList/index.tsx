import React, { RefObject } from "react";

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
        <div>프로젝트가 존재하지 않습니다.</div>
      )}
      <ObservationTarget currentRef={currentRef} />
    </div>
  );
}

export default ProjectList;

import React from "react";

import { ProjectItemProps } from "types/projectType";
import "./style.scss";
import ProjectItemViewModel from "../../../viewmodel/ProjectItemViewModel";

interface ProjectListProps {
  projectList: ProjectItemProps[];
}

function ProjectList({ projectList }: ProjectListProps) {
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
    </div>
  );
}

export default ProjectList;

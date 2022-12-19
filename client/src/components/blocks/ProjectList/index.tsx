import React from "react";

import ProjectItem from "components/blocks/ProjectItem";
import { ProjectItemProps } from "types/projectType";
import "./style.scss";

interface ProjectListProps {
  projectList: ProjectItemProps[];
  onClickPreview: () => {};
  onClickLikeBtn: () => {};
}

function ProjectList({ projectList, onClickPreview, onClickLikeBtn }: ProjectListProps) {
  return (
    <div id="project-list">
      {!!projectList.length ? (
        projectList.map((project) => (
          <ProjectItem
            projectName={project.projectName}
            trackTags={project.trackTags}
            likeCount={project.likeCount}
            isLiked={project.isLiked}
            onClickPreview={onClickPreview}
            onClickLikeBtn={onClickLikeBtn}
          />
        ))
      ) : (
        <div>프로젝트가 존재하지 않습니다.</div>
      )}
    </div>
  );
}

export default ProjectList;

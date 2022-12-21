import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { getProjectListSelector, lastProjectId } from "../model/projectModel";
import ProjectList from "../components/blocks/ProjectList";

function ProjectListViewModel() {
  const setLastProjectId = useSetRecoilState(lastProjectId);
  const getProjectList = useRecoilValue(getProjectListSelector);

  const projectList = getProjectList.responseDtos;
  const { hasNext } = getProjectList;

  if (hasNext) {
    const lastProjectId = projectList[projectList.length - 1].projectId;

    setLastProjectId(lastProjectId!);
  }

  // TODO: 무한 스크롤 동작 구현

  return <ProjectList projectList={projectList} />;
}

export default ProjectListViewModel;

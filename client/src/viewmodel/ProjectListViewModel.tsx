import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { getProjectListSelector, pageState } from "../model/projectModel";
import ProjectList from "../components/blocks/ProjectList";

function ProjectListViewModel() {
  const setPage = useSetRecoilState(pageState);
  const getProjectList = useRecoilValue(getProjectListSelector);

  // TODO: 미리듣기 재생 시 동작 구현
  const handleClickPreview = () => ({});
  // TODO: 좋아요 클릭 시 동작 구현
  const handleClickLikeBtn = () => ({});

  const projectList = getProjectList.responseDtos;

  // TODO: 무한 스크롤 동작 구현

  return (
    <ProjectList projectList={projectList} onClickPreview={handleClickPreview} onClickLikeBtn={handleClickLikeBtn} />
  );
}

export default ProjectListViewModel;

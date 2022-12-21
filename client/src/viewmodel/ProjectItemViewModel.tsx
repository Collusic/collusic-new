import React, { MouseEvent, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ProjectItemProps } from "types/projectType";
import ProjectItem from "components/blocks/ProjectItem";
import { setProjectLike } from "api/project";
import { isSignInState, modalOpenState } from "model/signInModel";

function ProjectItemViewModel({ projectId, projectName, trackPreviews, likeCount, isLiked }: ProjectItemProps) {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const setModalOpen = useSetRecoilState(modalOpenState);
  const isSignIn = useRecoilValue(isSignInState);

  // TODO: 미리듣기 재생 시 동작 구현
  const handleClickPreview = (e: MouseEvent) => {
    console.log(e);
  };
  const handleClickLikeBtn = async () => {
    if (isSignIn) {
      if (isLikedState) {
        setIsLikedState(false);
        setLikeCountState((prev) => prev - 1);
      } else {
        setIsLikedState(true);
        setLikeCountState((prev) => prev + 1);
      }
      await setProjectLike(projectId!);
    } else {
      alert("로그인이 필요한 서비스입니다.");
      setModalOpen(true);
    }
  };

  return (
    <ProjectItem
      isLiked={isLikedState}
      likeCount={likeCountState}
      projectName={projectName}
      trackPreviews={trackPreviews}
      onClickPreview={handleClickPreview}
      onClickLikeBtn={handleClickLikeBtn}
    />
  );
}

export default ProjectItemViewModel;

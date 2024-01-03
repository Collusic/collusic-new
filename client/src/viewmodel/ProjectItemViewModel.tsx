import { MouseEvent, RefObject, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { NavLink } from "react-router-dom";

import { ProjectItemProps } from "types/projectType";
import ProjectItem from "components/blocks/ProjectItem";
import { setProjectLike } from "api/project";
import { modalOpenState } from "model/signInModel";
import useAuth from "components/atoms/Auth/hooks/useAuth";

function ProjectItemViewModel({ projectId, projectName, trackPreviews, likeCount, isLiked }: ProjectItemProps) {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState<number>(likeCount);
  const [isPlaying, setIsPlaying] = useState(false);
  const setModalOpen = useSetRecoilState(modalOpenState);
  const previewPlayerRefs = trackPreviews.map(() => useRef<HTMLMediaElement>(null));
  const { isAuthorized: isAuthed } = useAuth({ reissue: false });

  const previewAction = (ref: RefObject<HTMLMediaElement>, action: string) => {
    return new Promise(() => {
      try {
        if (action === "play") ref.current!.play();
        else ref.current!.pause();
      } catch (err) {
        alert(`미리듣기가 ${action === "play" ? "재생" : "일시정지"}되지 않습니다. 잠시후 다시 시도해주세요.`);
      }
    });
  };

  const previewsAction = async (action: string) => {
    const taskPromises = previewPlayerRefs.map((ref) => previewAction(ref, action));
    await Promise.all(taskPromises);
  };

  const handleClickPlay = async (e: MouseEvent) => {
    e.preventDefault();
    if (!!previewPlayerRefs.find((ref) => ref.current!.paused)) {
      setIsPlaying(true);
      await previewsAction("play");
    } else {
      setIsPlaying(false);
      await previewsAction("pause");
    }
  };

  const handleClickLikeBtn = async (e: MouseEvent) => {
    e.preventDefault();
    if (isAuthed) {
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
    <NavLink to={`/${projectId}`}>
      <ProjectItem
        projectId={projectId}
        isLiked={isLikedState}
        isPlaying={isPlaying}
        likeCount={likeCountState}
        projectName={projectName}
        trackPreviews={trackPreviews}
        onClickPlay={handleClickPlay}
        onClickLikeBtn={handleClickLikeBtn}
        currentRefs={previewPlayerRefs}
      />
    </NavLink>
  );
}

export default ProjectItemViewModel;

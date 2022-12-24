import React from "react";

import TrackIcon from "components/atoms/TrackIcon";
import PreviewButton, { PreviewButtonProps } from "components/atoms/PreviewButton";
import LikeButton from "components/atoms/LikeButton";
import { ClickProjectItemEvent, ProjectItemProps } from "types/projectType";
import "./style.scss";

function ProjectItem({
  projectName,
  trackPreviews,
  likeCount,
  isLiked,
  isPlaying,
  onClickPreview,
  onClickLikeBtn,
  currentRefs,
}: ProjectItemProps & ClickProjectItemEvent & PreviewButtonProps) {
  return (
    <div className="project-item">
      <div className="title">{projectName}</div>
      <div className="track-list">
        {!!trackPreviews.length &&
          trackPreviews.map((track, idx) => (
            <div key={track.trackId}>
              <TrackIcon
                track={track.trackTag}
                style={{ position: "relative", right: `${idx * 6}px`, zIndex: idx + 1 }}
              />
              <audio ref={currentRefs![idx]} src={track.fileUrl} />
            </div>
          ))}
      </div>
      <hr />
      <div id="item-bottom">
        <PreviewButton isPlaying={isPlaying} onClickPreview={onClickPreview} />
        <LikeButton isLiked={isLiked} likeCount={likeCount} onClickLikeBtn={onClickLikeBtn} />
      </div>
    </div>
  );
}

export default ProjectItem;

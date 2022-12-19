import React from "react";

import TrackIcon from "components/atoms/TrackIcon";
import PreviewButton from "components/atoms/PreviewButton";
import LikeButton from "components/atoms/LikeButton";
import { ProjectItemProps } from "types/projectType";
import "./style.scss";

interface ClickEventProps {
  onClickPreview: () => {};
  onClickLikeBtn: () => {};
}

function ProjectItem({
  projectName,
  trackTags,
  likeCount,
  isLiked,
  onClickPreview,
  onClickLikeBtn,
}: ProjectItemProps & ClickEventProps) {
  return (
    <div className="project-item">
      <div className="title">{projectName}</div>
      <div className="track-list">
        {!!trackTags.length &&
          trackTags.map((track, idx) => (
            <TrackIcon
              track={track.name}
              key={track.id}
              style={{ position: "relative", right: `${idx * 6}px`, zIndex: idx + 1 }}
            />
          ))}
      </div>
      <hr />
      <div id="item-bottom">
        {/* TODO: isPlaying props 넘겨주기 */}
        <PreviewButton isPlaying onClickPreview={onClickPreview} />
        <LikeButton isLiked={isLiked} likeCount={likeCount} onClickLikeBtn={onClickLikeBtn} />
      </div>
    </div>
  );
}

export default ProjectItem;
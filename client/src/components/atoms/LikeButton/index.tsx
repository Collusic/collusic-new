import React from "react";

import "./style.scss";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  onClickLikeBtn(): void;
}

function LikeButton({ isLiked, likeCount, onClickLikeBtn }: LikeButtonProps) {
  return (
    <button type="button" id="like-button" onClick={onClickLikeBtn}>
      <img src={`${process.env.PUBLIC_URL}/assets/likeIcon/${isLiked ? "like.png" : "unlike.png"}`} alt="" />
      <span>{likeCount}</span>
    </button>
  );
}

export default LikeButton;

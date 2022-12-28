import React, { MouseEvent } from "react";
import classNames from "classnames";


import "./style.scss";

interface LikeButtonProps {
  useIn?: string;
  isLiked: boolean;
  likeCount: number;
  onClickLikeBtn(e: MouseEvent): void;
}

function LikeButton({ useIn, isLiked, likeCount, onClickLikeBtn }: LikeButtonProps) {
  return (
    <button
      type="button"
      className={classNames("like-button", { "like-by-detail": useIn === "detail" })}
      onClick={onClickLikeBtn}
    >
      <img src={`${process.env.PUBLIC_URL}/assets/likeIcon/${isLiked ? "like.png" : "unlike.png"}`} alt="" />
      <span>{likeCount}</span>
    </button>
  );
}

export default LikeButton;

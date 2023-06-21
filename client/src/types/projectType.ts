import { MouseEvent, RefObject } from "react";
import { TrackResponseType } from "./trackType";

export type Track =
  | "피아노"
  | "드럼"
  | "보컬"
  | "박수"
  | "어쿠스틱 기타"
  | "일렉 기타"
  | "바이올린"
  | "리코더"
  | "마라카스"
  | "ETC"
  | "";

export type MelodyLength = "4" | "8" | "16";

interface TrackTag {
  fileUrl: string;
  trackId: number;
  trackTag: Track;
}

export interface ProjectItemProps {
  isLiked: boolean;
  likeCount: number;
  projectId?: number;
  projectName: string;
  trackPreviews: TrackTag[];
  currentRefs?: RefObject<HTMLMediaElement>[];
}

export interface GetProjectPagination {
  hasNext: boolean;
  projectCount: number;
  responseDtos: ProjectItemProps[];
}

export interface ClickProjectItemEvent {
  onClickPlay(e: MouseEvent): void;
  onClickLikeBtn(e: MouseEvent): void;
}

export type ProjectResponseType = {
  bpm: number;
  isLiked: boolean;
  likeCount: number;
  projectId: number;
  projectName: string;
  tracks: Array<TrackResponseType>;
};

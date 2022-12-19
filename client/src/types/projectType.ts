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
  id: string;
  name: Track;
  src: string;
}

export interface ProjectItemProps {
  projectName: string;
  trackTags: TrackTag[];
  likeCount: number;
  isLiked: boolean;
}

export interface GetProjectPagination {
  responseDtos: ProjectItemProps[];
  number: number;
  hasNext: boolean;
}

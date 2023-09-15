import { TrackResponseType } from "types/trackType";

export interface DetailProjectInfo {
  projectId: number;
  projectName: string;
  bpm: number;
  likeCount: number;
  isLiked: boolean;
  tracks: TrackResponseType[];
}

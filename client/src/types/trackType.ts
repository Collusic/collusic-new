import { Track } from "./projectType";

export type TrackResponseType = {
  fileUrl: string;
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  trackId: number;
  trackName: string;
  trackTag: Track;
};

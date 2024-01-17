import { Track } from "types/projectType";

export type TrackResponseType = {
  fileUrl: string;
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  trackId: number;
  trackName: string;
  trackTag: Track;
};

export interface TrackPlayerProps {
  bpm: number;
  time: number;
  audioTracks: HTMLAudioElement[];
  setTime: (prev: number) => void;
  onRecord?: () => void;
}

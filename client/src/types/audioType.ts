import { NEW_TRACK_ID } from "constants/key";

export type AudioSourceType = {
  id: number;
  source: string;
};

export type AudioType = {
  id: number | typeof NEW_TRACK_ID;
  audio: HTMLAudioElement;
};

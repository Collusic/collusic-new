import { atom } from "recoil";
import { AudioType } from "types/audioType";

const audioListState = atom<AudioType[]>({
  key: "audioListState",
  default: [],
});

const isAudioPlayingState = atom({
  key: "isAudioPlayingState",
  default: false,
});

const isTrackPlayingState = atom({
  key: "isTrackPlayingState",
  default: false,
});

const timeState = atom({
  key: "timeState",
  default: 0,
});

export { audioListState, isAudioPlayingState, isTrackPlayingState, timeState };

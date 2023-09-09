import { atom } from "recoil";
import { AudioType } from "types/audioType";

const audioListState = atom<AudioType[]>({
  key: "audioListState",
  default: [],
});

const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});

const timeState = atom({
  key: "timeState",
  default: 0,
});

export { audioListState, isPlayingState, timeState };

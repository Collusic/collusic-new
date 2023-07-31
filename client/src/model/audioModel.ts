import { atom } from "recoil";

const audioListState = atom<Array<HTMLAudioElement>>({
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

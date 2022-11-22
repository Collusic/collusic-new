import { atom } from "recoil";

import { MelodyLength, Track } from "types/projectType";

export const projectNameState = atom({
  key: "projectNameState",
  default: "",
});

export const inputDeviceState = atom({
  key: "InputDeviceState",
  default: "입력장치를 선택해주세요.",
});

export const sessionMelodyState = atom<MelodyLength>({
  key: "SessionMelodyState",
  default: "4",
});

export const bpmState = atom({
  key: "bpmState",
  default: 0,
});

export const tagListState = atom<Track[]>({
  key: "TagListState",
  default: [],
});

export const selectedTrackState = atom<Track>({
  key: "SelectedTrackState",
  default: "",
});

export const isEditableState = atom({
  key: "IsEditableState",
  default: true,
});

export const isStartedRecordingState = atom({
  key: "IsStartedRecordingState",
  default: false,
});

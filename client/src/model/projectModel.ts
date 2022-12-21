import { atom, selector } from "recoil";

import { GetProjectPagination, MelodyLength, Track } from "types/projectType";
import { getProjectList } from "api/project";

// 프로젝트 이름
export const projectNameState = atom({
  key: "ProjectNameState",
  default: "",
});
// 입력 장치 text
export const inputDeviceTextState = atom({
  key: "inputDeviceTextState",
  default: "입력장치를 선택해주세요.",
});
// 설정한 입력 장치
export const inputDeviceState = atom<MediaStreamConstraints | undefined>({
  key: "inputDeviceState",
  default: undefined,
});
// 선택한 멜로디 마디
export const sessionMelodyState = atom<MelodyLength>({
  key: "SessionMelodyState",
  default: "4",
});
// 프로젝트 bpm
export const bpmState = atom({
  key: "bpmState",
  default: 0,
});
// 선택한 트랙
export const selectedTrackState = atom<Track>({
  key: "SelectedTrackState",
  default: "",
});
// 편집 가능 여부
export const isEditableState = atom({
  key: "IsEditableState",
  default: true,
});
// 녹음 시작 여부
export const isStartedRecordingState = atom({
  key: "IsStartedRecordingState",
  default: false,
});
export const lastProjectId = atom({
  key: "lastProjectIdState",
  default: 1,
});
// 프로젝트 목록
export const getProjectListSelector = selector<GetProjectPagination>({
  key: "getPrjectListSelector",
  get: async ({ get }) => {
    const page = get(lastProjectId);
    const data = await getProjectList({ page });

    return data;
  },
});

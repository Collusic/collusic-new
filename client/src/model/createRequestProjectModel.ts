import { atom, selector } from "recoil";

const requestFileState = atom<File | undefined>({
  key: "requestFile",
  default: undefined,
});

const requestFieldState = atom<string[]>({
  key: "requestFieldState",
  default: [],
});

const requestGenreState = atom<string[]>({
  key: "requestGenreState",
  default: [],
});

const requestMoodState = atom<string[]>({
  key: "requestMoodState",
  default: [],
});

const postRequestApi = selector({
  key: "postRequestApi",
  get: ({ get }) => {},
});

export {
  requestFileState,
  requestFieldState,
  requestGenreState,
  requestMoodState,
  postRequestApi,
};

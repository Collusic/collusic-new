import { atom, selector } from "recoil";

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
  requestFieldState,
  requestGenreState,
  requestMoodState,
  postRequestApi,
};

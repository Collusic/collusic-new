import { atom } from "recoil";
import { ACCESS_TOKEN_KEY } from "constants/key";
import tokenStorage from "utils/tokenStorage";

export const accessTokenAtom = atom<string | null>({
  key: "accessToken",
  default: null,
  effects: [
    (param) => {
      const storage = tokenStorage(ACCESS_TOKEN_KEY);
      const defaultToken = storage.get();
      const isAuthorized = () => !!defaultToken;

      if (isAuthorized()) {
        param.setSelf(defaultToken);
      }
    },
  ],
});

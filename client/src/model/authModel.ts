import { atom } from "recoil";

import tokenStorage from "utils/tokenStorage";
import { API } from "api/axios";
import { ACCESS_TOKEN_KEY } from "constants/key";

export const accessTokenAtom = atom<string | null>({
  key: "accessToken",
  default: null,
  effects_UNSTABLE: [
    (param) => {
      const storage = tokenStorage(ACCESS_TOKEN_KEY);
      const defaultToken = storage.get();
      const isAuthorized = () => !!defaultToken;

      if (isAuthorized()) {
        param.setSelf(defaultToken);
      }

      param.onSet((newToken, _, isReset) => {
        if (isReset || !newToken) {
          storage.remove();
          return;
        }

        storage.set(newToken);
        API.defaults.headers.common.Authorization = `Bearer ${newToken}`;
      });
    },
  ],
});

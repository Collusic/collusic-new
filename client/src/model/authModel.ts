import { atom } from "recoil";

import { API } from "api/axios";

export const accessTokenAtom = atom<string | null>({
  key: "accessToken",
  default: null,
  effects_UNSTABLE: [
    (param) => {
      const defaultToken = API.defaults.headers.common.Authorization;
      const isAuthorized = () => !!defaultToken;

      if (isAuthorized()) {
        param.setSelf(defaultToken);
      }

      param.onSet((newToken, _, isReset) => {
        if (!isReset) {
          API.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        }
      });
    },
  ],
});

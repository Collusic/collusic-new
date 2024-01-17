import { useRecoilState } from "recoil";

import { accessTokenAtom } from "model/authModel";
import { API } from "api/axios";
import tokenStorage from "utils/tokenStorage";
import { ACCESS_TOKEN_KEY } from "constants/key";

const useAuth = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const storage = tokenStorage(ACCESS_TOKEN_KEY);

  const setAuth = (newToken: string) => {
    storage.set(newToken);
    setAccessToken(newToken);
    API.defaults.headers.common.Authorization = `Bearer ${newToken}`;
  };
  const resetAccessToken = () => {
    storage.remove();
    setAccessToken(null);
  };

  return {
    isAuthorized: !!accessToken,
    setAuth,
    signOut: () => {
      resetAccessToken();
      API.get("/logout");
    },
  };
};

export default useAuth;

import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

import { accessTokenAtom } from "model/authModel";
import { API } from "api/axios";

type Props = {
  reissue: boolean;
};

const useAuth = (props?: Props) => {
  const resetAccessToken = useResetRecoilState(accessTokenAtom);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);

  const reissue = props?.reissue ?? true;

  const setAuth = (newToken: string) => {
    setAccessToken(newToken);
  };

  useEffect(() => {
    if (accessToken === null && reissue) {
      API.post("/reissue")
        .then((res) => {
          const { token } = res.data;

          if (!token) {
            return;
          }

          setAuth(token);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  return {
    isAuthorized: !!accessToken,
    setAuth,
    signOut: () => {
      API.get("/logout");
      resetAccessToken();
    },
  };
};

export default useAuth;

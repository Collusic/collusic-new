import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { accessTokenAtom, isAuthorizedState } from "model/authModel";
import { API } from "api/axios";

type Props = {
  reissue: boolean;
};

const useAuth = (props?: Props) => {
  const resetAccessToken = useResetRecoilState(accessTokenAtom);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [isAuthorized, setIsAuthorized] = useRecoilState(isAuthorizedState);

  const reissue = props?.reissue ?? true;

  const setAuth = (newToken: string) => {
    // TODO: 토큰 valitaion
    setIsAuthorized(true);
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

  useEffect(() => {
    setIsAuthorized(!!accessToken);
  }, [accessToken]);

  return {
    isAuthorized,
    setAuth,
    signOut: () => {
      API.get("/logout");
      setIsAuthorized(false);
      resetAccessToken();
    },
  };
};

export default useAuth;

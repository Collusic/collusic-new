import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useLocation } from "react-router-dom";
import { API } from "../api/axios";
import { isSignInState } from "../model/signInModel";

export default function AuthVerify() {
  const setIsSignInState = useSetRecoilState(isSignInState);
  const location = useLocation();

  useEffect(() => {
    const isAuthorized = () => !!API.defaults.headers.common.Authorization;

    if (isAuthorized()) {
      return;
    }

    API.post("/reissue")
      .then((res) => {
        const { token } = res.data;

        if (!token) {
          return;
        }

        API.defaults.headers.common.Authorization = `Bearer ${token}`;
        setIsSignInState(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [location]);

  return null;
}

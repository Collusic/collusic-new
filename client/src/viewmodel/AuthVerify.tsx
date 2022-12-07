import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useLocation } from "react-router-dom";
import { API } from "../utils/axios";
import { signInState } from "../model/signInModel";

export default function AuthVerify() {
  const setSignInState = useSetRecoilState(signInState);
  const location = useLocation();

  useEffect(() => {
    if (API.defaults.headers.common.Authorization) {
      return;
    }

    API.post("/reissue", {}, { withCredentials: true })
      .then((res) => {
        const { token } = res.data;

        if (!token) return;

        API.defaults.headers.common.Authorization = `Bearer ${token}`;
        setSignInState(true);
      })
      .catch((err) => {
        console.log("dd", err);
      });
  }, [location]);

  return <> </>;
}

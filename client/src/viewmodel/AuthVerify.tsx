import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useLocation } from "react-router-dom";
import { API } from "../utils/axios";
import { signInState } from "../model/signInModel";

export default function AuthVerify(props: { logout: () => void }) {
  const setSignInState = useSetRecoilState(signInState);
  const location = useLocation();
  const { logout } = props;

  useEffect(() => {
    if (API.defaults.headers.common.Authorization) {
      console.log(API.defaults.headers.common.Authorization);
      return;
    }

    console.log(API.defaults.headers.common);
    API.post("/reissue", {}, { withCredentials: true })
      .then((res) => {
        const { token } = res.data;

        console.log(res);
        if (!token) return;

        API.defaults.headers.common.Authorization = `Bearer ${token}`;
        setSignInState(true);
      })
      .catch((err) => {
        console.log("dd", err);
      });
  }, [location, logout]);

  return <div> </div>;
}

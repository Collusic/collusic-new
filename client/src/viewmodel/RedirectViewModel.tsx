import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

import { API } from "../utils/axios";
import { loginTypeState, refreshTokenState } from "../model/userModel";
import { modalOpenState } from "../model/signInModel";
import { signUpState } from "../model/signUpModel";

export function RedirectViewModel() {
  const setModalOpenState = useSetRecoilState(modalOpenState);
  const setSignUpState = useSetRecoilState(signUpState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const loginType = useRecoilValue(loginTypeState);
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const authCode = query.get("code");
  const state = query.get("state");

  useEffect(() => {
    const getLoginState = async () => {
      try {
        const { data }: AxiosResponse = await API.get(`/oauth2/login/kakao`, {
          data: {
            auth_code: (authCode as string) + state,
          },
        });

        if (data.responseType === "SIGN_IN") {
          const { accessToken, refreshToken } = data;
          setRefreshToken(refreshToken);
          API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        }

        if (data.responseType === "SIGN_UP") {
          setModalOpenState(false);
          setSignUpState(true);
          navigate("/signup", { state: data });
        }

        if (data.responseType === "ERROR") {
          alert(data.errorMessage);
          navigate("/signin");
        }
      } catch (err) {
        console.error(err);
      }
    };

    getLoginState();
  }, [loginType]);

  return <div>{loginType} 로그인 로딩중</div>;
}

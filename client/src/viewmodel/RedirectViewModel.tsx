import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

import { LOCAL_API } from "../api/axios";
import { refreshTokenState } from "../model/userModel";
import { modalOpenState } from "../model/signInModel";
import { signUpState } from "../model/signUpModel";

export function RedirectViewModel() {
  const setModalOpenState = useSetRecoilState(modalOpenState);
  const setSignUpState = useSetRecoilState(signUpState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);

  const navigate = useNavigate();
  const { snsType } = useParams();
  const [query] = useSearchParams();
  const code = query.get("code");
  const state = query.get("state");

  useEffect(() => {
    const getLoginState = async () => {
      try {
        const { data }: AxiosResponse = await LOCAL_API.get(`/oauth2/login/${snsType}`, {
          params: {
            code,
            state,
          },
        });

        if (data.responseType === "SIGN_IN") {
          const { accessToken, refreshToken } = data;
          setRefreshToken(refreshToken);
          LOCAL_API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        }

        if (data.responseType === "SIGN_UP") {
          setModalOpenState(false);
          setSignUpState(true);
          navigate("/signup", { state: data.attributes });
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
  });

  return <div>{snsType} 로그인 로딩중</div>;
}

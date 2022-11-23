import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

import { API } from "../utils/axios";
import { modalOpenState, signInState } from "../model/signInModel";
import { signUpState } from "../model/signUpModel";

export function RedirectViewModel() {
  const setModalOpenState = useSetRecoilState(modalOpenState);
  const setSignInState = useSetRecoilState(signInState);
  const setSignUpState = useSetRecoilState(signUpState);

  const navigate = useNavigate();
  const { snsType } = useParams();
  const [query] = useSearchParams();
  const code = query.get("code");
  const state = query.get("state");

  useEffect(() => {
    const getLoginState = async () => {
      try {
        const response: AxiosResponse = await API.get(`/oauth2/login/${snsType}`, {
          params: {
            code,
            state,
          },
        });

        const { data } = response;

        console.dir(response);

        if (data.responseType === "SIGN_IN") {
          const { accessToken } = data.attributes;

          API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          setSignInState(true);
          navigate("/");
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

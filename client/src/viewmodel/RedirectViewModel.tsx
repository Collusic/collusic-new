import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

import { API } from "api/axios";
import { modalOpenState } from "model/signInModel";
import { signUpState } from "model/signUpModel";
import useAuth from "components/atoms/Auth/hooks/useAuth";

export function RedirectViewModel() {
  const setModalOpenState = useSetRecoilState(modalOpenState);
  const setSignUpState = useSetRecoilState(signUpState);

  const navigate = useNavigate();
  const { snsType } = useParams();
  const [query] = useSearchParams();
  const code = query.get("code");
  const state = query.get("state");

  const { isAuthorized, setAuth } = useAuth({ reissue: false });

  useEffect(() => {
    if (isAuthorized) {
      return;
    }

    const getLoginState = async () => {
      try {
        const response: AxiosResponse = await API.get(`/oauth2/login/${snsType}`, {
          params: {
            code,
            state,
          },
        });

        const { data } = response;

        if (data.responseType === "SIGN_IN") {
          const { accessToken } = data.attributes;

          setAuth(accessToken);
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

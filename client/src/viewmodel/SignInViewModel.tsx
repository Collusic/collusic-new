import React from "react";
import { useRecoilState } from "recoil";

import { SignInView } from "../view/SignInView";
import { loginTypeState } from "../model/userModel";

export function SignInViewModel() {
  const [loginType, setLoginType] = useRecoilState(loginTypeState);

  const naverClickHandler = () => {
    setLoginType("naver");
    window.location.href =
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=37fxHiyXMIr6sxLm2MPe&state=7IiQorH-lspV_Axq3aD2sSvI5bAVYVB1RY3R2o70Ilo%3D&redirect_uri=http://localhost:3000/auth/redirect";
  };

  const kakaoClickHandler = () => {
    setLoginType("kakao");
    console.log(loginType);
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=6acab7ac79ce0a072e6ddf08861d28ed&scope=account_email openid&state=qYXwGnJBNMGJPabC1nmKuMn9CChc3WCF72mmr8HHRi8%3D&redirect_uri=http://localhost:3000/auth/redirect";
  };
  const googleClickHandler = () => {
    setLoginType("google");
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=717532271001-pu3fqqghv2rbi3ldeivht3pmlvaveep6.apps.googleusercontent.com&scope=email openid&state=vGT5WolwVcBKgizeawrLfpjUfxiVzE-RmJnioZGWIBI%3D&redirect_uri=http://localhost:3000/auth/redirect";
  };

  return (
    <SignInView
      naverClickHandler={naverClickHandler}
      kakaoClickHandler={kakaoClickHandler}
      googleClickHandler={googleClickHandler}
    />
  );
}

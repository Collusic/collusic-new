import React from "react";

import "../utils/style/login.scss";
import { LoginButton } from "../components/LoginButton";

type signInProps = {
  onClickHandler(): void;
};

export function SignInView({ onClickHandler }: signInProps) {
  return (
    <div className="login-view">
      <LoginButton
        innerText="네이버로 시작하기"
        backgroundColor="#03c75a"
        textColor="#fff"
        src="../assets/login/naver.svg"
        onClickHandler={onClickHandler}
      />
      <LoginButton
        innerText="카카오로 시작하기"
        backgroundColor="#fee500"
        textColor="#000"
        src="../assets/login/kakao.svg"
        onClickHandler={onClickHandler}
      />
      <LoginButton
        innerText="구글로 시작하기"
        backgroundColor="#fff"
        textColor="#000"
        src="../assets/login/google.svg"
        onClickHandler={onClickHandler}
      />
    </div>
  );
}

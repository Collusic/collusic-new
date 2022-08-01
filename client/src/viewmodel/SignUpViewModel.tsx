import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { signUpState, getSignUpUserInfo } from "../model/signUpModel";

import { SignUpView } from "../view/SignUpView";
import { Modal } from "../components/Modal";

import { TEST_API } from "../utils/axios";

import "../utils/style/SignUp.scss";

export function SignUpViewModel() {
  const [signUp, setSignUp] = useRecoilState(signUpState);
  const { profileSrc, email } = useRecoilValue(getSignUpUserInfo);

  const signUpEventHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nickName = (event.target as HTMLInputElement).parentElement!.querySelector("input")!.value;

    const formData = new FormData();
    formData.append("nickName", nickName);
    formData.append("email", email);

    TEST_API.post("/members", formData);
  };

  return (
    <Modal showModal={signUp} setShowModal={setSignUp}>
      <SignUpView profileSrc={profileSrc} email={email} signUpEventHandler={signUpEventHandler} />
    </Modal>
  );
}

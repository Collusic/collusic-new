import React from "react";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";

import { signUpState } from "../model/signUpModel";

import { SignUpView } from "../view/SignUpView";
import { Modal } from "../components/Modal";

import { TEST_API } from "../utils/axios";

import "../utils/style/SignUp.scss";

type UserData = {
  responseType?: string;
  email: string;
  authId?: string;
  profile: string;
  snsType?: string;
};

export function SignUpViewModel() {
  const [signUp, setSignUp] = useRecoilState(signUpState);
  const location = useLocation();
  const { email, profile } = location.state as UserData;

  const signUpEventHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nickName = (event.target as HTMLInputElement).parentElement!.querySelector("input")!.value;

    const formData = new FormData();
    formData.append("nickName", nickName);
    formData.append("email", email);

    TEST_API.post("/members", formData);
  };

  return (
    <Modal showModal={signUp} setShowModal={setSignUp}>
      <SignUpView profileSrc={profile} email={email} signUpEventHandler={signUpEventHandler} />
    </Modal>
  );
}

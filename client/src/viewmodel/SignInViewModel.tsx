import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { SignInView } from "../view/SignInView";

import { modalOpenState } from "../model/signInModel";
import { signUpState } from "../model/signUpModel";

export function SignInViewModel() {
  const navigate = useNavigate();
  const setModalOpenSate = useSetRecoilState(modalOpenState);
  const setSignUpState = useSetRecoilState(signUpState);

  const onClickHandler = () => {
    setModalOpenSate(false);
    setSignUpState(true);
    navigate("/signup");
  };

  return <SignInView onClickHandler={onClickHandler} />;
}

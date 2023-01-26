import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

import { signUpState } from "model/signUpModel";

import { SignUp } from "components/blocks/SignUp";
import { Modal } from "components/atoms/Modal";
import useAuth from "components/atoms/Auth/hooks/useAuth";

import { API } from "api/axios";
import { validateLetter, validateLength } from "../utils/validation";

type MemberData = {
  [key: string]: any;
  email: string;
  authId: string;
  nickName?: string;
  profileImageUrl: string;
  snsType: string;
};

export function SignUpViewModel() {
  const location = useLocation();
  const navigate = useNavigate();
  const [signUp, setSignUp] = useRecoilState(signUpState);
  const { setAuth } = useAuth({ reissue: false });

  const { authId, email, profileImageUrl, snsType } = location.state as MemberData;

  const signUpEventHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nickName = (event.target as HTMLInputElement).parentElement!.querySelector("input")!.value;

    if (!validateLetter(nickName) || !validateLength(nickName)) {
      alert("최소 2자 이상 최대 12자 이하(영문, 한글, 숫자)로 입력해 주세요.");
      return;
    }

    API.get(`/members/${nickName}`)
      .then(() => {
        const memberData: MemberData = { authId, email, nickName, profileImageUrl, snsType };
        const formData = new FormData();

        Object.keys(memberData).forEach((key) => formData.append(key, memberData[key]));

        API.post("/members", formData)
          .then((res) => {
            const { data }: AxiosResponse = res;
            const { accessToken } = data.attributes;

            setAuth(accessToken);
            alert("회원가입 완료");
            navigate("/");
          })
          .catch((err) => {
            const { message } = err.response.data.fieldErrors[0];
            alert(message);
          });
      })
      .catch(() => {
        alert("이미 존재하는 닉네임입니다.");
      });
  };

  return (
    <Modal showModal={signUp} setShowModal={setSignUp}>
      <SignUp profileSrc={profileImageUrl} email={email} signUpEventHandler={signUpEventHandler} />
    </Modal>
  );
}

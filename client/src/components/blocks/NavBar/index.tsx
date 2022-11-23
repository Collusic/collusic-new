import React from "react";
import { useRecoilState } from "recoil";
import { API } from "utils/axios";

import { modalOpenState, signInState } from "../../../model/signInModel";
import { SignInViewModel } from "../../../viewmodel/SignInViewModel";
import { Modal } from "../../atoms/Modal";

import "./style.scss";

export function NavBar() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpenState);
  const [isSignIn, setIsSignIn] = useRecoilState(signInState);

  const handleLoginButtonClick = () => {
    console.log(isSignIn);

    if (!isSignIn) {
      setIsModalOpen(!isModalOpen);
      return;
    }

    setIsSignIn(false);
    API.get("/logout").then((res) => {
      console.log(res);
      console.log("로그아웃 완료!");
    });
  };

  return (
    <header>
      <div className="navbar">
        <h1>
          <a className="logo" href="/">
            Collusic
          </a>
        </h1>
        <nav>
          <ul>
            <li>
              <a href=".">
                <img src="../../../../public" alt="alarm" />
              </a>
            </li>
            <li className="signin">
              <button className="signin-btn" type="button" onClick={handleLoginButtonClick}>
                {isSignIn ? "로그아웃" : "로그인/회원가입"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {!isSignIn && isModalOpen ? (
        <Modal showModal={isModalOpen} setShowModal={setIsModalOpen}>
          <img width="100%" src="../../assets/signin/logo@2x.png" alt="logo" />
          <SignInViewModel />
        </Modal>
      ) : null}
    </header>
  );
}

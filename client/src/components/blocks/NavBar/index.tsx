import React from "react";
import { useRecoilState } from "recoil";

import useAuth from "components/atoms/Auth/hooks/useAuth";
import { Modal } from "components/atoms/Modal";
import { modalOpenState } from "model/signInModel";
import { SignInViewModel } from "viewmodel/SignInViewModel";

import "./style.scss";

export function NavBar() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpenState);
  const LogoImgUrl = `${process.env.PUBLIC_URL}/assets/logo/logo@2x.png`;
  const SignInImgUrl = `${process.env.PUBLIC_URL}/assets/signin/logo@2x.png`;

  const { isAuthorized, signOut } = useAuth({ reissue: false });

  const handleLoginButtonClick = () => {
    if (!isAuthorized) {
      setIsModalOpen(!isModalOpen);
      return;
    }

    signOut();
  };

  return (
    <header>
      <div className="navbar">
        <a href="/">
          <img src={LogoImgUrl} alt="" />
        </a>
        <nav>
          <ul>
            <li className="signin">
              <button className="signin-btn" type="button" onClick={handleLoginButtonClick}>
                {isAuthorized ? "로그아웃" : "로그인/회원가입"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {!isAuthorized && isModalOpen ? (
        <Modal showModal={isModalOpen} setShowModal={setIsModalOpen}>
          <img width="100%" src={SignInImgUrl} alt="logo" />
          <SignInViewModel />
        </Modal>
      ) : null}
    </header>
  );
}

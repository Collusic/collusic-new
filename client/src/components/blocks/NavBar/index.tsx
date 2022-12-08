import React from "react";
import { useRecoilState } from "recoil";

import { modalOpenState } from "../../../model/signInModel";
import { SignInViewModel } from "../../../viewmodel/SignInViewModel";
import { Modal } from "../../atoms/Modal";

import "./style.scss";

export function NavBar() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpenState);

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
              <a href="/">
                <img src="../../assets/alarm/alarm.png" alt="alarm" />
              </a>
            </li>
            <li className="signin">
              <button className="signin-btn" type="button" onClick={() => setIsModalOpen(!isModalOpen)}>
                로그인/회원가입
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {isModalOpen ? (
        <Modal showModal={isModalOpen} setShowModal={setIsModalOpen}>
          <img width="100%" src="../../assets/signin/logo@2x.png" alt="logo" />
          <SignInViewModel />
        </Modal>
      ) : null}
    </header>
  );
}

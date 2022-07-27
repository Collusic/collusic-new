import React from "react";
import { useRecoilValue } from "recoil";

import { ModalView } from "./ModalView";
import { LoginView } from "./LoginView";

import { modalOpenState } from "../model/signInModel";

import "../utils/style/StartPage.scss";
import "../utils/style/login.scss";

export function StartPageView() {
  const isModalOpen = useRecoilValue(modalOpenState);

  return (
    <>
      <div className="start-page-view" style={{ opacity: isModalOpen ? "0.4" : "" }} />
      <ModalView>
        <img width="100%" src="../../assets/signin/logo@2x.png" alt="logo" />
        <LoginView />
      </ModalView>
    </>
  );
}

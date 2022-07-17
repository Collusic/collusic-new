import React from "react";
import { useRecoilValue } from "recoil";

import { SignInView } from "./SignInView";
import { modalOpenState } from "../model/signInModel";
import "../utils/style/StartPage.scss";

export function StartPageView() {
  const isModalOpen = useRecoilValue(modalOpenState);

  return (
    <>
      <div className="start-page-view" style={{ opacity: isModalOpen ? "0.4" : "" }} />
      <SignInView />
    </>
  );
}

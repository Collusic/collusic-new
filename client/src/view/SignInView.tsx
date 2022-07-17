import React from "react";
import { useRecoilValue } from "recoil";

import { modalOpenState } from "../model/signInModel";
import "../utils/style/SignIn.scss";

export function SignInView() {
  const isModalOpen = useRecoilValue(modalOpenState);

  return (
    <div>
      {isModalOpen ? (
        <div className="modal">
          <img src="../../assets/signin/modal.png" alt="logo" />
        </div>
      ) : null}
    </div>
  );
}

import React from "react";
import { useRecoilState } from "recoil";

import { modalOpenState } from "../model/signInModel";
import "../utils/style/SignIn.scss";

export function SignInView() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpenState);

  return (
    <div>
      {isModalOpen ? (
        <div className="modal">
          <button type="button" onClick={() => setIsModalOpen(false)}>
            <img src="../../assets/close/close_black_24dp.png" alt="close" />
          </button>
          <img src="../../assets/signin/modal.png" alt="logo" />
        </div>
      ) : null}
    </div>
  );
}

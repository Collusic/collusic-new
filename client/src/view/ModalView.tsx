import React from "react";
import { useRecoilState } from "recoil";

import { modalOpenState } from "../model/signInModel";
import "../utils/style/Modal.scss";

type modalProps = {
  children: React.ReactNode;
};

export function ModalView(props: modalProps) {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpenState);
  const { children } = props;

  return isModalOpen ? (
    <div className="modal">
      <button type="button" className="close" onClick={() => setIsModalOpen(false)}>
        <img src="../../assets/close/close_black_24dp.png" alt="close" />
      </button>
      {children}
    </div>
  ) : null;
}

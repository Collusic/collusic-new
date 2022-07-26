import React from "react";
import { useRecoilValue } from "recoil";

import { modalOpenState } from "../model/signInModel";
import "../utils/style/Modal.scss";

type modalProps = {
  children: React.ReactNode;
};

export function ModalView(props: modalProps) {
  const isModalOpen = useRecoilValue(modalOpenState);
  const { children } = props;

  return isModalOpen ? <div className="modal">{children}</div> : null;
}

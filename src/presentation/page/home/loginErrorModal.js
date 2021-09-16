import React from "react";
import { ErrorModalContainer } from "./styled";

const LoginErrorModal = ({ closeErrorModal, error }) => {
  return (
    <ErrorModalContainer>
      <button onClick={closeErrorModal} className="Modal__Button--Cancel">
        x
      </button>
      <h2>{error}</h2>

      <button onClick={closeErrorModal}>확인</button>
    </ErrorModalContainer>
  );
};

export default LoginErrorModal;

import React from "react";

import "../utils/style/Modal.scss";

type modalProps = {
  showModal: boolean;
  setShowModal(arg: boolean): void;
  children: React.ReactNode;
};

export function Modal(props: modalProps) {
  const { showModal, setShowModal, children } = props;

  return showModal ? (
    <>
      <div className="dimmed" style={{ opacity: showModal ? "0.4" : "" }} />
      <div className="modal">
        <button
          type="button"
          className="close"
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          <img src="../../assets/close/close_black_24dp.png" alt="close" />
        </button>
        {children}
      </div>
    </>
  ) : null;
}

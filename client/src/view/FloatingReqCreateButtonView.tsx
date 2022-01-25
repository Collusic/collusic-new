import React, { MouseEventHandler } from "react";

import "../utils/style/FloatingReqCreateButton.scss";

export const FloatingReqCreateButtonView: React.FC = () => {
  const mouseOverHandler = () => {
    document.querySelector(".text-box")?.classList.add("mouse-on-size");
    document.querySelector(".create-text")?.classList.add("mouse-on-font");
  };

  const mouseLeaveHandler = () => {
    document.querySelector(".text-box")?.classList.remove("mouse-on-size");
    document.querySelector(".create-text")?.classList.remove("mouse-on-font");
  };

  return (
    <React.Fragment>
      <div className="text-box">
        <div className="create-text">Create Project</div>
      </div>
      <img
        className="plus-button"
        alt="plus-button"
        src="../../assets/createButton/createButton.png"
        onClick={() => (window.location.href = "/createRequest")}
        onMouseOver={mouseOverHandler}
        onMouseLeave={mouseLeaveHandler}
      ></img>
    </React.Fragment>
  );
};

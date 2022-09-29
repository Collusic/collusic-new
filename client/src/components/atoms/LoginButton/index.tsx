import React from "react";

import "./style.scss";

type LoginButtonProps = {
  innerText: string;
  backgroundColor: string;
  textColor: string;
  src: string;
  onClickHandler(): void;
};

export function LoginButton({ innerText, backgroundColor, textColor, src, onClickHandler }: LoginButtonProps) {
  return (
    <button
      type="button"
      className="login-button"
      style={{ backgroundColor: `${backgroundColor}`, color: `${textColor}` }}
      onClick={onClickHandler}
    >
      <img src={src} alt="logo" />
      <p>{innerText}</p>
    </button>
  );
}

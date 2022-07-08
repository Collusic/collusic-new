import React from "react";

import "../utils/style/loginButton.scss";

type LoginButtonProps = {
  innerText: string,
  backgroundColor: string,
  textColor: string,
  src: string;
}

export const LoginButton = ({innerText, backgroundColor, textColor, src} : LoginButtonProps) => {
  return (
    <button className="login-button" style={{backgroundColor: `${backgroundColor}`, color: `${textColor}`}}>
      <img src={src} alt="logo"/>
      <p>{innerText}</p>
      </button>
  )
}
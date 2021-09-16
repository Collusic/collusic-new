import React, { useState, useCallback } from "react";
import { LoginModalContainer } from "./styled";

const LoginModal = ({ closeModal, openSignInModal }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const onChange = useCallback(
    (e) => {
      setLoginForm({
        ...loginForm,
        [e.target.name]: e.target.value,
      });
    },
    [loginForm]
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      var regExp =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

      if (!regExp.test(loginForm.email)) {
      } else {
      }
    },
    [loginForm]
  );
  return (
    <LoginModalContainer>
      <form onSubmit={onSubmit} name="loginForm">
        <button onClick={closeModal} className="Modal__Button--Cancel">
          x
        </button>
        <h2>Collusic</h2>
        <input
          type="text"
          id="LoginModal__email"
          placeholder="이메일"
          name="email"
          value={loginForm.email}
          onChange={onChange}
        />
        <input
          type="password"
          id="LoginModal__password"
          placeholder="비밀번호"
          name="password"
          value={loginForm.password}
          onChange={onChange}
        />
        <button id="LoginModal__LoginButton" type="submit">
          LOG IN
        </button>
        <button id="LoginModal__SignInButton" onClick={openSignInModal}>
          회원가입
        </button>
      </form>
    </LoginModalContainer>
  );
};

export default LoginModal;

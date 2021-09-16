import React, { useCallback, useState } from "react";
import { SignInModalContainer } from "./styled";

const SignInModal = ({ closeModal }) => {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const signIn = (e) => {
    const email = document.getElementById("SignInModal__email").value;
    const password = document.getElementById("SignInModal__password").value;

    setSignInForm({
      email: email,
      password: password,
    });
  };
  const SignInSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const passwordConfirmation = document.getElementById(
        "SignInModal__passwordConfirmation"
      ).value;
      if (signInForm.password !== passwordConfirmation) {
        alert("패스워드와 패스워드 확인이 다릅니다.");
      }
    },
    [signInForm]
  );
  return (
    <form onSubmit={SignInSubmit}>
      <SignInModalContainer>
        <button onClick={closeModal} className="Modal__Button--Cancel">
          x
        </button>
        <h2>Collusic</h2>

        <input
          id="SignInModal__email"
          type="text"
          placeholder="Email"
          onChange={signIn}
        />
        <input
          id="SignInModal__password"
          type="password"
          placeholder="비밀번호"
          onChange={signIn}
        />
        <input
          id="SignInModal__passwordConfirmation"
          type="password"
          placeholder="비밀번호 확인"
          onChange={signIn}
        />
        <button className="SingInModal__SignUpButton" type="submit">
          SIGN UP
        </button>
      </SignInModalContainer>
    </form>
  );
};

export default SignInModal;

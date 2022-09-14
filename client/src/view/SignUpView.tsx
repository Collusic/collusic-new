import React from "react";

type signUpProps = {
  profileSrc: string;
  email: string;
  // eslint-disable-next-line no-unused-vars
  signUpEventHandler(e: React.MouseEvent<HTMLButtonElement>): void;
};

export function SignUpView({ profileSrc, email, signUpEventHandler }: signUpProps) {
  return (
    <div className="signup">
      <img className="profile" src={profileSrc} alt="profile" />
      <p className="email">{email}</p>
      <input type="text" placeholder="닉네임을 입력해주세요" />
      <div className="tooltip">
        <img src="../../assets/signin/info_black_24dp.svg" alt="info" />
        <span>최소 2자 이상 최대 12자 이하(영문, 한글, 숫자)</span>
      </div>
      <button className="signup-button" type="button" onClick={signUpEventHandler}>
        프로필 등록하기
      </button>
    </div>
  );
}

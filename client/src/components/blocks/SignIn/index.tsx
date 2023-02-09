import { LoginButton } from "../../atoms/LoginButton";
import "./style.scss";

type signInProps = {
  onNaverClick(): void;
  onKakaoClick(): void;
  onGoogleClick(): void;
};

export function SignIn({ onNaverClick, onKakaoClick, onGoogleClick }: signInProps) {
  return (
    <div className="login-view">
      <LoginButton
        innerText="네이버로 시작하기"
        backgroundColor="#03c75a"
        textColor="#fff"
        src="../assets/login/naver.svg"
        onBtnClick={onNaverClick}
      />
      <LoginButton
        innerText="카카오로 시작하기"
        backgroundColor="#fee500"
        textColor="#000"
        src="../assets/login/kakao.svg"
        onBtnClick={onKakaoClick}
      />
      <LoginButton
        innerText="구글로 시작하기"
        backgroundColor="#fff"
        textColor="#000"
        src="../assets/login/google.svg"
        onBtnClick={onGoogleClick}
      />
    </div>
  );
}

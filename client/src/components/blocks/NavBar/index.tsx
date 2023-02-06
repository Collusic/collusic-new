import { useRecoilState } from "recoil";

import { Modal } from "components/atoms/Modal";
import { modalOpenState, isSignInState } from "model/signInModel";
import { SignInViewModel } from "viewmodel/SignInViewModel";
import { API } from "api/axios";
import "./style.scss";

export function NavBar() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpenState);
  const LogoImgUrl = `${process.env.PUBLIC_URL}/assets/logo/logo@2x.png`;
  const SignInImgUrl = `${process.env.PUBLIC_URL}/assets/signin/logo@2x.png`;
  const [isSignIn, setIsSignIn] = useRecoilState(isSignInState);

  const handleLoginButtonClick = () => {
    if (!isSignIn) {
      setIsModalOpen(!isModalOpen);
      return;
    }

    setIsSignIn(false);
    API.get("/logout");
  };

  return (
    <header>
      <div className="navbar">
        <a href="/">
          <img src={LogoImgUrl} alt="" />
        </a>
        <nav>
          <ul>
            <li className="signin">
              <button className="signin-btn" type="button" onClick={handleLoginButtonClick}>
                {isSignIn ? "로그아웃" : "로그인/회원가입"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {!isSignIn && isModalOpen ? (
        <Modal showModal={isModalOpen} setShowModal={setIsModalOpen}>
          <img width="100%" src={SignInImgUrl} alt="logo" />
          <SignInViewModel />
        </Modal>
      ) : null}
    </header>
  );
}

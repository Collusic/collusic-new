import React from "react";
import Modal from "react-modal";
import Login from "./LoginModal";
import Error from "./loginErrorModal";
import BG from "assets/bg.png";
import SignIn from "./SignInModal";
import {
  StyledContainer,
  HomeImageContainer,
  HomeNav,
  HomeImage,
  customStyles,
} from "./styled";

const Home = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [LoginModalIsOpen, setLoginModalIsOpen] = React.useState(true);
  const [signInModalIsOpen, setSigninModalIsOpen] = React.useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function closeModal() {
    setIsOpen(false);
    setSigninModalIsOpen(false);
    setLoginModalIsOpen(true);
  }
  function openSignInModal() {
    setSigninModalIsOpen(true);
    setLoginModalIsOpen(false);
  }
  function closeErrorModal() {
    setErrorModalIsOpen(false);
  }
  function openErrorModal() {
    setErrorModalIsOpen(true);
  }
  return (
    <StyledContainer id="HomeContainer">
      <HomeNav>
        <button>Collusic</button>
        <button onClick={openModal}>로그인</button>
      </HomeNav>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="LogIn Modal"
      >
        {LoginModalIsOpen && (
          <Login
            closeModal={closeModal}
            openSignInModal={openSignInModal}
            setErrorModal={openErrorModal}
            setError={setLoginError}
          ></Login>
        )}
        {signInModalIsOpen && (
          <SignIn
            closeModal={closeModal}
            setErrorModal={openErrorModal}
            setError={setLoginError}
          >
            <Modal
              isOpen={errorModalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeErrorModal}
              style={customStyles}
              ariaHideApp={false}
              contentLabel="Error Modal"
            >
              <Error
                closeErrorModal={closeErrorModal}
                error={loginError}
              ></Error>
            </Modal>
          </SignIn>
        )}
      </Modal>
      <Modal
        isOpen={errorModalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeErrorModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Error Modal"
      >
        <Error closeErrorModal={closeErrorModal} error={loginError}></Error>
      </Modal>
      <HomeImageContainer>
        <HomeImage src={BG}></HomeImage>
      </HomeImageContainer>
    </StyledContainer>
  );
};
export default Home;

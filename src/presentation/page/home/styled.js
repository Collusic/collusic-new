import styled from "styled-components";
import { css } from "styled-components";
import Color from "utils/style/color";
import { FontFamily } from "utils/style/default";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    backgroundColor: "white",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "0.5px solid white",
    borderRadius: "10px",
    boxShadow: "0 4px 4px 0 rgba(0,0,0,0.3)",
  },
  overlay: {
    backgroundColor: "rgb(0,0,0,0.5)",
  },
};

//////////////////////////////////////////////////////////////////////////////////

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;
const HomeNav = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: absolute;
  color: white;
  top: 2em;
  button {
    border: none;
    cursor: pointer;
  }
  & button:first-child {
    margin-left: 1em;
    font-size: 30px;
    font-weight: 700;
    background-color: inherit;
    font-family: "Krona One";
    color: white;
  }
  & button:last-child {
    width: 7em;
    height: 2.2em;
    margin-right: 2em;
    background-color: white;
    color: ${Color.MAIN_COLOR};
    border: 1px solid inherit;
    font-family: ${FontFamily.KoreanFont};
    border-radius: 20px;
    font-size: 19px;
    font-weight: 700;
  }
`;

const HomeImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  height: 100vh;
`;

const HomeImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;
HomeImage.defaultProps = {
  src: "https://images.unsplash.com/photo-1624541199114-d86774a7caa6?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
};

/////////////////////////////////////

const ModalButton = css`
  border-radius: 30px;
  margin: 0.5em 0.5em;
  width: 25rem;
  height: 3.7rem;
  font-family: ${FontFamily.EnglishFont}, ${FontFamily.KoreanFont};
`;
const ModalInput = css`
  ${ModalButton}
`;

const LoginModalContainer = styled.div`
  & > form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    position: relative;
  }
  & > form > h2 {
    color: ${Color.MAIN_COLOR};
    font-family: "Krona One";
    font-size: 32px;
    cursor: default;
    margin-top: 10px;
  }
  & > form > .Modal__Button--Cancel {
    background-color: inherit;
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    cursor: pointer;
    font-size: 2em;
    opacity: 0.5;
  }
  & > form > input {
    ${ModalInput};
    font-size: 1.3em;
    border: none;
    border-bottom: solid 1px #909090;
    border-radius: 0;
    font-family: ${FontFamily.KoreanFont};
    &:focus {
      outline: none;
    }
  }
  & > form > input::placeholder {
    color: #c1c1c1;
  }
  & > form > #LoginModal__LoginButton {
    ${ModalButton}
    width:10rem;
    border: 1px solid ${Color.MAIN_COLOR};
    background-color: ${Color.MAIN_COLOR};
    color: white;
    font-family: ${FontFamily.KoreanFont};
    font-weight: 700;
    cursor: pointer;
    font-size: 1.2rem;
    margin-top: 2rem;
  }
  & > form > #LoginModal__SignInButton {
    background-color: inherit;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    font-family: "Noto Sans KR";
    color: #505050;
    margin-top: 2rem;
  }
`;
/////////////////////////////////////////

const SignInModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: white;
  position: relative;
  & > h2 {
    color: ${Color.MAIN_COLOR};
    font-family: "Krona One";
    font-size: 2.7em;
    cursor: default;
  }
  & .Modal__Button--Cancel {
    background-color: inherit;
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    cursor: pointer;
    font-size: 2em;
    opacity: 0.5;
  }
  & input {
    ${ModalInput};
    font-size: 1.3em;
    border: none;
    border-bottom: solid 1px #909090;
    border-radius: 0;
    font-family: ${FontFamily.KoreanFont};
    &:focus {
      outline: none;
    }
  }
  & input::placeholder {
    color: #c1c1c1;
  }
  & > .SingInModal__SignUpButton {
    ${ModalButton}
    width:27rem;
    border: 1px solid ${Color.MAIN_COLOR};
    background-color: ${Color.MAIN_COLOR};
    color: white;
    font-family: "Krona One";
    cursor: pointer;
    font-size: 1.5rem;
    margin-top: 2rem;
  }
  & > div {
    position: relative;
    & > img {
      position: absolute;
      right: 0;
      top: 25%;
      display: none;
    }
  }
`;

/////////////////////////////////////////
const ErrorModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: ${FontFamily.KoreanFont};
  & > button {
    cursor: pointer;
  }
  & > button:first-child {
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    background-color: inherit;
    font-size: 20px;
  }
  & > h2 {
    margin-top: 40px;
  }
  & > button:last-child {
    border: none;
    background-color: inherit;
    font-size: 10px;
    margin-top: 20px;
  }
`;
export {
  StyledContainer,
  HomeImageContainer,
  HomeNav,
  HomeImage,
  customStyles,
  LoginModalContainer,
  SignInModalContainer,
  ErrorModalContainer,
};

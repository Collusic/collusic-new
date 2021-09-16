import styled, { css } from "styled-components";
import { FontFamily } from "utils/style/default";
import { FontSize, ElementDistanceEachOthers } from "utils/style/size";
import Color from "utils/style/color";

const CreateContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  width: 100%;
  margin-top: 80px;
  & .white {
    background-color: red;
  }
  grid-row-gap: 80px;
  font-family: ${FontFamily.EnglishFont};
`;
const IndexContainer = styled.div`
  display: flex;
  justify-content: center;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    border: solid 2px ${Color.MAIN_COLOR};
    border-radius: 35px;
    font-family: ${FontFamily.EnglishFont};
    color: ${Color.MAIN_COLOR};
    font-size: 36px;
  }
`;

const TitleInput = styled.input`
  width: 60%;
  font-family: ${FontFamily.KoreanFont};
  font-size: ${FontSize.MEDIUM};
  border: none;
  border-bottom: solid 2px #909090;
  margin-bottom: 40px;
  font-weight: bold;
  ::placeholder {
    font-weight: 700;
  }
  :focus {
    outline: none;
  }
`;

const ContentTextArea = styled.textarea`
  width: 56%;
  border: solid 2px #909090;
  resize: none;
  padding: 2%;
  overflow: hidden;
  font-size: ${FontSize.SMALL_MEDIUM};
  border-radius: 20px;
  font-family: ${FontFamily.KoreanFont}, ${FontFamily.EnglishFont};
  :focus {
    outline: none;
  }
`;

const CheckButton = css`
  width: 144px;
  height: 40px;
  border: inherit;
  border-radius: 10px;
  font-size: ${FontSize.SMALL};
  margin-right: ${ElementDistanceEachOthers.SMALL};
  font-family: ${FontFamily.KoreanFont};

  border-radius: 20px;
  border: solid 2px #909090;
  color: #909090;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: inherit;
`;
const NotCheckedButton = styled.button`
  ${CheckButton}
`;
const CheckedButton = styled.button`
  ${CheckButton}
  color: ${Color.MAIN_COLOR};
  border-color: ${Color.MAIN_COLOR};
  font-weight: 700;
`;

const ButtonTitle = styled.h2`
  font-family: ${FontFamily.KoreanFont};
  font-weight: bold;
  color: #202020;
`;

const SubmitButton = styled.button`
  width: 20%;
  background-color: ${Color.MAIN_COLOR};
  color: white;
  border: inherit;
  height: 60px;
  border-radius: 30px;
  font-family: NotoSansKR;
  font-size: 20px;
  font-weight: bold;
  margin: 5% 40%;
  cursor: pointer;
`;
const FileButton = styled.button`
  width: 1em;
  height: 1em;
  align-items: center;
  justify-content: center;
  border-radius: 0.5em;
  display: flex;
  color: white;
  background-color: gray;
  margin-right: 0.5em;
  border: inherit;
  cursor: pointer;
`;

const RadioButton = ({ title, onClick, keyword, value }) => {
  return (
    <>
      {keyword === value ? (
        <CheckedButton onClick={onClick}>{value}</CheckedButton>
      ) : (
        <NotCheckedButton onClick={onClick}>{value}</NotCheckedButton>
      )}
    </>
  );
};
const SelectButton = ({ title, onClick, arr, value }) => {
  return (
    <>
      {arr.includes(value) ? (
        <CheckedButton onClick={onClick}>{value}</CheckedButton>
      ) : (
        <NotCheckedButton onClick={onClick}>{value}</NotCheckedButton>
      )}
    </>
  );
};
const Index = ({ index }) => {
  return (
    <>
      <IndexContainer>
        <div>{index}</div>
      </IndexContainer>
    </>
  );
};
export {
  CreateContainer,
  RadioButton,
  SelectButton,
  Index,
  TitleInput,
  ContentTextArea,
  ButtonTitle,
  SubmitButton,
  FileButton,
};

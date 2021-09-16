import styled from "styled-components";
import Color from "utils/style/color";

const Window = styled.div`
  display: flex;
  width: 100vw;
  height: 88vh;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 58vw;
  height: 88vh;
  background-color: #fafafa;
`;

const InputContext = styled.input`
  width: 50vw;
  height: 20vh;
  margin: 30px;
  border-radius: 20px;
  border: solid 2px #909090;
  background-color: #ffffff;
`;

const InputLyrics = styled.input`
  width: 50vw;
  height: 25vh;
  margin: 30px;
  border-radius: 20px;
  border: solid 2px #909090;
  background-color: #ffffff;
`;

const UploadMidi = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 10vh;
  border-radius: 20px;
  border: solid 2px #909090;
  background-color: #ffffff;
`;

const InputMidi = styled.input`
  width: 2vw;
  height: 5vh;
  border: none;
  background-color: #ffffff;
  opacity: 0;
`;
const PlaceHolder = styled.div`
  display: flex;
  align-items: center;
  width: 45vw;
  height: 5vh;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.44;
  letter-spacing: normal;
  text-align: left;
  color: ${Color.TEXT_SUB_COLOR};
`;

const UploadButton = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

export default {
  Window,
  LeftBox,
  InputContext,
  InputLyrics,
  UploadMidi,
  InputMidi,
  PlaceHolder,
  UploadButton,
};

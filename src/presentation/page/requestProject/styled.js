import styled, { keyframes, css } from "styled-components";
import {
  ElementDistanceEachOthers,
  ElementSizeByHeight,
  FontSize,
} from "utils/style/size";
import Color from "utils/style/color";

const Window = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95vw;
  height: 90vh;
`;

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 80vh;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: ${ElementSizeByHeight.MEDIUM};
  padding: ${ElementDistanceEachOthers.LARGE} 0
    ${ElementDistanceEachOthers.MEDIUM};
  font-family: "Krona One", sans-serif;
  font-size: ${FontSize.EXTRA_LARGE};
  text-align: center;
  color: ${Color.MAIN_COLOR};
`;

const ProjectBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 20vh;
  margin-bottom: 50px;
  z-index: 2;
`;

const Project = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-evenly;
  width: 30rem;
  height: 20rem;
  padding: 30px;
  border-radius: 10px;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  z-index: 2;
`;

const ProjectUserImg = styled.img`
  width: 32px;
  height: 32px;
`;

const ProjectUserId = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 10rem;
  height: ${ElementSizeByHeight.SMALL};
  padding-left: 6px;
  font-size: ${FontSize.SMALL_MEDIUM};
  font-weight: 600;
  font-family: NotoSansKR;
  color: #202020;
`;

const ProjectTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 20rem;
  height: 5rem;
  padding: 20px 0 0 0;
  font-size: ${FontSize.MEDIUM};
  font-weight: 600;
  font-family: NotoSansKR;
  color: #202020;
`;

const ProjectField = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 40px;
  height: ${ElementSizeByHeight.TWO_EXTRA_SMALL};
  padding: 0 0 20px 0;
  font-size: ${FontSize.MEDIUM_SMALL};
  font-weight: 500;
  font-family: NotoSansKR;
  color: #c1c1c1;
`;

const FieldMelody = styled.img`
  width: 32px;
  height: 32px;
  padding: 5px;
`;

const FieldInstrument = styled.img`
  width: 32px;
  height: 32px;
  padding: 5px;
`;

const FieldLyric = styled.img`
  width: 32px;
  height: 32px;
  padding: 5px;
`;

const GenreMood = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 20px;
  padding-top: 20px;
`;

const Genre = styled.div`
  display: flex;
  jutify-content: center;
  align-items: center;
  width: 40px;
  height: 20px;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: ${Color.MAIN_COLOR};
`;

const GenreContext = styled.div`
  display: flex;
  jutify-content: center;
  align-items: center;
  width: 100px;
  height: 20px;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: ${Color.TEXT_MAIN_COLOR};
`;

const Mood = styled.div`
  display: flex;
  jutify-content: center;
  align-items: center;
  width: 60px;
  height: 20px;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: ${Color.MAIN_COLOR};
`;

const MoodContext = styled.div`
  display: flex;
  jutify-content: center;
  align-items: center;
  width: 100px;
  height: 20px;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: ${Color.TEXT_MAIN_COLOR};
`;

const after = keyframes`
0% {
  width: 250px;
  opacity: 0;
}
to {
  width: 300px;
  opacity: 100;
}
`;

const before = keyframes`
from {
  width: 300px;
  opacity: 100;
}
to {
  width: 250px;
  opacity: 0;
}
  `;

const CreateProject = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 250px;
  height: 250px;
  position: absolute;
  right: 30px;
  bottom: 30px;
  font-family: "Krona One", sans-serif;
  z-index: 1;
`;

const CreateProjectButtonText = styled.div`
  position: absolute;
  right: 180px;
  bottom: 86px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 60px;
  height: 80px;
  padding: 0 0 0 30px;
  font-family: "Krona One", sans-serif;
  font-size: ${FontSize.MEDIUM};
  color: ${Color.MAIN_COLOR};
  border-radius: 40px;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  z-index: 1;

  ${(props) => {
    if (props.isLong === true) {
      return css`
        animation: ${after} 0.8s forwards;
      `;
    } else {
      return css`
        animation: ${before} 0.8s forwards;
      `;
    }
  }}
`;

const CreateProjectButton = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  object-fit: contain;
  z-index: 2;
`;

export default {
  Window,
  Section,
  Title,
  ProjectBox,
  Project,
  ProjectUserImg,
  ProjectUserId,
  ProjectTitle,
  ProjectField,
  FieldInstrument,
  FieldMelody,
  FieldLyric,
  GenreMood,
  Genre,
  GenreContext,
  Mood,
  MoodContext,
  CreateProject,
  CreateProjectButton,
  CreateProjectButtonText,
};

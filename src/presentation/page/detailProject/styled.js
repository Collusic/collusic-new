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
  width: 58vw;
  height: 88vh;
  background-color: #fafafa;
  z-index: 1;
`;

const LeftHeader = styled.header`
  display: flex;
  justify-content: space-between;
  width: 45vw;
  height: 60px;
  padding: 70px 50px 50px 160px;
`;

const HeaderName = styled.div`
  display: flex;
  justify-content: center;
  width: 120px;
  height: 25px;
  color: ${Color.MAIN_COLOR};
  font-family: "Krona One";
  font-size: 20px;
`;

const ContributeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 132px;
  height: 40px;
  border: none;
  border-radius: 25px;
  color: #ffffff;
  background-color: ${Color.MAIN_COLOR};
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 45vw;
  height: 40px;
  padding: 20px 50px 20px 160px;
`;

const Project = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 500px;
  padding: 10px 0px;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
`;

const Profile = styled.img`
  width: 40px;
  height: 40px;
`;

const Email = styled.div`
  width: 161px;
  height: 20px;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: ${Color.TEXT_MAIN_COLOR};
`;

const Genre = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 20px;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: center;
  color: ${Color.TEXT_MAIN_COLOR};
`;

const LikeButton = styled.img`
  width: 32px;
  height: 32px;
`;
const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: 88vh;
`;

const Title = styled.div`
  width: 30vw;
  height: 88px;
  padding-left: 50px;
  font-family: NotoSansKR;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: -1.5px;
  text-align: left;
  color: ${Color.TEXT_MAIN_COLOR};
`;

const ProjectStates = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 37vw;
  height: 10vh;
  padding: 160px 20px 40px 50px;
`;

const RequestField = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: flex-start;
  width: 240px;
  height: 120px;
  border-radius: 10px;
  background-color: #fffcf2;
`;

const RequestFieldTitle = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 70px;
  height: 20px;
  padding-left: 20px;

  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: ${Color.MAIN_COLOR};
`;

const RequestFieldItems = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 180px;
  height: 25px;
`;

const RequestFieldItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 25px;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: ${Color.TEXT_MAIN_COLOR};
`;

const RequestGenre = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 240px;
  height: 120px;
  border-radius: 10px;
  background-color: #fffcf2;
`;

const RequestGenreTitle = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 55px;
  height: 20px;
  padding-left: 20px;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: ${Color.MAIN_COLOR};
`;

const RequestGenreItems = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 39px;
  height: 20px;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: ${Color.TEXT_MAIN_COLOR};
`;

const RequestMood = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 240px;
  height: 120px;
  padding-left: 20px;

  border-radius: 10px;
  background-color: #fffcf2;
`;

const RequestMoodTitle = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 55px;
  height: 20px;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: ${Color.MAIN_COLOR};
`;

const RequestMoodItems = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 39px;
  height: 20px;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: ${Color.TEXT_MAIN_COLOR};
`;

const RequestText = styled.div`
  width: 37vw;
  height: 20vh;
  padding: 20px 20px 100px 50px;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: -0.7px;
  text-align: left;
  color: ${Color.TEXT_MAIN_COLOR};
`;
const LineBox = styled.div`
  display: flex;
  justify-content: center;
  width: 37vw;
  height: 1vh;
`;
const Line = styled.div`
  width: 37vw;
  height: 0;
  margin: 0 0 0 50px;
  border: solid 1px #f1f1f1;
`;

const RequestProfile = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 37vw;
  height: 20vh;
  padding: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  padding-left: 50px;
`;

const RequestContext = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 30vw;
  height: 10vh;
  padding: 0 20px;
`;

const RequestEmail = styled.div`
  width: 30vw;
  height: 10vh;
  padding-top: 30px;
  font-family: NotoSansKR;
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
  text-align: left;
  color: ${Color.TEXT_MAIN_COLOR};
`;

const RequestIntroduce = styled.div`
  width: 35vw;
  height: 20vh;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.57;
  letter-spacing: normal;
  text-align: left;
  color: ${Color.TEXT_SUB_COLOR};
`;

export default {
  Window,
  LeftBox,
  LeftHeader,
  HeaderName,
  ContributeButton,
  ProjectList,
  Project,
  Profile,
  Email,
  Genre,
  LikeButton,
  RightBox,
  Title,
  ProjectStates,
  RequestField,
  RequestFieldTitle,
  RequestFieldItems,
  RequestFieldItem,
  RequestGenre,
  RequestGenreTitle,
  RequestGenreItems,
  RequestMood,
  RequestMoodTitle,
  RequestMoodItems,
  RequestText,
  LineBox,
  Line,
  RequestProfile,
  ProfileImage,
  RequestContext,
  RequestEmail,
  RequestIntroduce,
};

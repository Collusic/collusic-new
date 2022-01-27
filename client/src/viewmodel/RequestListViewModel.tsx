import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { detailRequestProjectIdState } from "../model/detailRequestProjectModel";
import {
  getRequestList,
  getPageList,
  currentPageState,
} from "../model/requestProjectsModel";
import { RequestProjectType } from "../types/requestProjectType";
import { User } from "../types/userType";
import { RequestListPagenationView } from "../view/RequestListPagenationView";
import { RequestListView } from "../view/RequestListView";

export const RequestListViewModel: React.FC = () => {
  const requestList = useRecoilValue(getRequestList);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const pagenationList: number[] = useRecoilValue(getPageList)!;
  const [projectId, setProjectId] = useRecoilState(detailRequestProjectIdState);

  const onClickNumberHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(Number(e.currentTarget.value));
  };

  const onClickLeftHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(currentPage - 1);
  };

  const onClickRightHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(currentPage + 1);
  };

  const redirectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    setProjectId(id);
    window.location.href = `/requestprojects/${projectId}`;
  };
  // upload의 타입에 따라 img태그안에 src를 넣을지, 가사를 텍스트로 집어넣을지 결정해야
  const defaultRequestList: Array<User & RequestProjectType> = [
    {
      requestProjectId: 1,
      userProfile: "",
      userEmail: "test1",
      requestTitle: "test1",
      requestField: ["lyric"],
      requestGenre: ["Hiphop"],
      requestMood: ["Happy"],
      requestLyric: "이 멜로디 너무 좋아",
    },
    {
      requestProjectId: 2,
      userProfile: "",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["Hiphop"],
      requestMood: ["Happy"],
      requestInstrument:
        "https://collusic-new-bucket.s3.ap-northeast-2.amazonaws.com/static/LetterToDolphins.mp3",
    },
    {
      requestProjectId: 3,
      userProfile: "",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["Hiphop"],
      requestMood: ["Happy"],
      requestInstrument:
        "https://collusic-new-bucket.s3.ap-northeast-2.amazonaws.com/static/horse.mp3",
    },
    {
      requestProjectId: 4,
      userProfile: "",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["Hiphop"],
      requestMood: ["Happy"],
      requestInstrument:
        "https://collusic-new-bucket.s3.ap-northeast-2.amazonaws.com/static/LetterToDolphins.mp3",
    },
    {
      requestProjectId: 5,
      userProfile: "",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["Hiphop"],
      requestMood: ["Happy"],
      requestInstrument:
        "https://collusic-new-bucket.s3.ap-northeast-2.amazonaws.com/static/horse.mp3",
    },
    {
      requestProjectId: 6,
      userProfile: "",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["Hiphop"],
      requestMood: ["Happy"],
      requestInstrument:
        "https://collusic-new-bucket.s3.ap-northeast-2.amazonaws.com/static/LetterToDolphins.mp3",
    },
    {
      requestProjectId: 7,
      userProfile: "",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["Hiphop"],
      requestMood: ["Happy"],
      requestInstrument:
        "https://collusic-new-bucket.s3.ap-northeast-2.amazonaws.com/static/horse.mp3",
    },
    {
      requestProjectId: 8,
      userProfile: "",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["Hiphop"],
      requestMood: ["Happy"],
      requestInstrument:
        "https://collusic-new-bucket.s3.ap-northeast-2.amazonaws.com/static/LetterToDolphins.mp3",
    },
  ];

  const defaultPagenationList = [1, 2, 3, 4, 5];
  const defaultCurrentPage = 1;
  return (
    <React.Fragment>
      <RequestListView
        requestList={defaultRequestList}
        onClickRedirectHandler={redirectHandler}
      ></RequestListView>
      <RequestListPagenationView
        currentPage={defaultCurrentPage}
        pagenationList={defaultPagenationList}
        onClickNumberHandler={onClickNumberHandler}
        onClickLeftHandler={onClickLeftHandler}
        onClickRightHandler={onClickRightHandler}
      ></RequestListPagenationView>
    </React.Fragment>
  );
};

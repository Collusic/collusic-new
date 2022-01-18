import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

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
  const [, setCurrentPage] = useRecoilState(currentPageState);
  const pagenationList: number[] = useRecoilValue(getPageList)!;

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(Number(e.currentTarget.value));
    document
      .querySelector(`#${e.currentTarget.id}`)
      ?.classList.add("page-clicked");
  };
  // upload의 타입에 따라 img태그안에 src를 넣을지, 가사를 텍스트로 집어넣을지 결정해야
  const defaultRequestList: Array<User & RequestProjectType> = [
    {
      requestProjectId: 1,
      userProfile: "test1",
      userEmail: "test1",
      requestTitle: "test1",
      requestField: ["lyric"],
      requestGenre: ["hiphop"],
      requestMood: ["happy"],
      requestLyric: "이 멜로디 너무 좋아",
    },
    {
      requestProjectId: 2,
      userProfile: "test2",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["hiphop"],
      requestMood: ["happy"],
      requestInstrument: "s3.com/fesaieja",
    },
    {
      requestProjectId: 3,
      userProfile: "test2",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["hiphop"],
      requestMood: ["happy"],
      requestInstrument: "s3.com/fesaieja",
    },
    {
      requestProjectId: 4,
      userProfile: "test2",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["hiphop"],
      requestMood: ["happy"],
      requestInstrument: "s3.com/fesaieja",
    },
    {
      requestProjectId: 5,
      userProfile: "test2",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["hiphop"],
      requestMood: ["happy"],
      requestInstrument: "s3.com/fesaieja",
    },
    {
      requestProjectId: 6,
      userProfile: "test2",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["hiphop"],
      requestMood: ["happy"],
      requestInstrument: "s3.com/fesaieja",
    },
    {
      requestProjectId: 7,
      userProfile: "test2",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["hiphop"],
      requestMood: ["happy"],
      requestInstrument: "s3.com/fesaieja",
    },
    {
      requestProjectId: 8,
      userProfile: "test2",
      userEmail: "test2",
      requestTitle: "test2",
      requestField: ["melody"],
      requestGenre: ["hiphop"],
      requestMood: ["happy"],
      requestInstrument: "s3.com/fesaieja",
    },
  ];
  return (
    <React.Component>
      <RequestListView requestList={defaultRequestList}></RequestListView>
      <RequestListPagenationView
        pagenationList={pagenationList}
        onClickHandler={onClickHandler}
      ></RequestListPagenationView>
    </React.Component>
  );
};

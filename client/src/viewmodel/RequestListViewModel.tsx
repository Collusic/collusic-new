import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  detailRequestProjectIdState,
  getDetailRequestState,
} from "../model/detailRequestProjectModel";
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
  const [requestList, totalPage] = useRecoilValue(getRequestList);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const pagenationList: number[] = useRecoilValue(getPageList)!;
  const [projectId, setProjectId] = useRecoilState(detailRequestProjectIdState);
  const getDetailRequest = useRecoilValue(getDetailRequestState);

  const asyncProjectId = async (id: string) => {
    const projectId = await setProjectId(id);
    return projectId;
  };

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
    asyncProjectId(id).then((projectId) => {
      console.log(projectId);
      window.location.href = `/requestprojects/${projectId}`;
    });
  };
  // upload의 타입에 따라 img태그안에 src를 넣을지, 가사를 텍스트로 집어넣을지 결정해야

  console.log(requestList, totalPage);
  return (
    <React.Fragment>
      <RequestListView
        requestList={requestList}
        onClickRedirectHandler={redirectHandler}
      ></RequestListView>
      <RequestListPagenationView
        currentPage={currentPage}
        pagenationList={pagenationList}
        onClickNumberHandler={onClickNumberHandler}
        onClickLeftHandler={onClickLeftHandler}
        onClickRightHandler={onClickRightHandler}
      ></RequestListPagenationView>
    </React.Fragment>
  );
};

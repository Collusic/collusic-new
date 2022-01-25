import React from "react";
import { useRecoilValue } from "recoil";

import { contributeListState } from "../model/detailRequestProjectModel";
import { ContributeListView } from "../view/ContributeListView";

export const ContributeListViewModel: React.FC = () => {
  const contributeList = useRecoilValue(contributeListState);

  return (
    <ContributeListView contributeList={contributeList}></ContributeListView>
  );
};

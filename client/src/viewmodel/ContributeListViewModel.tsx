import React from "react";
import { useRecoilValue } from "recoil";

import { contributeListState } from "../model/detailRequestProjectModel";
import { ContributeListView } from "../view/ContributeListView";

type ContributeListViewProps = {
  onClickHandler(e: React.MouseEvent<HTMLButtonElement> | any): void;
};

export const ContributeListViewModel: React.FC<ContributeListViewProps> = ({
  onClickHandler,
}) => {
  const contributeList = useRecoilValue(contributeListState);

  return (
    <ContributeListView
      onClickHandler={onClickHandler}
      contributeList={contributeList}
    ></ContributeListView>
  );
};

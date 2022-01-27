import React, { useState } from "react";

import { CreateContributeViewModel } from "./CreateContributeViewModel";
import { ContributeListViewModel } from "./ContributeListViewModel";

export const DetailRequestViewPageModel: React.FC = () => {
  const [flag, setFlag] = useState(0);

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement> | any) => {
    setFlag(1);
  };

  return flag ? (
    <CreateContributeViewModel />
  ) : (
    <ContributeListViewModel
      onClickHandler={onClickHandler}
    ></ContributeListViewModel>
  );
};

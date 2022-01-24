import React from "react";
import { useRecoilState } from "recoil";
import { CreateFieldView } from "../view/CreateFieldView";
import { currentRequestProjectId } from "../model/createContributeProjectModel";

export const CreateContributeViewModel: React.FC = () => {
  const [currentRequestId, setCurrentRequestId] = useRecoilState(
    currentRequestProjectId
  );

  return <CreateFieldView fields={} onClickFieldHandler={}></CreateFieldView>;
};

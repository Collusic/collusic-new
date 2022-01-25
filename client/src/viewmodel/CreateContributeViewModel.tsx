import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CreateFieldView } from "../view/CreateFieldView";
import {
  getRequestProjectField,
  contributeFields,
} from "../model/createContributeProjectModel";
import { Field } from "../types/requestProjectType";

export const CreateContributeViewModel: React.FC = () => {
  const requestFields = useRecoilValue(getRequestProjectField);
  const [contriFields, setContriFields] = useRecoilState(contributeFields);

  const onClickFieldHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    let value = e.currentTarget.firstChild!.nodeValue;
    value = value!.toLowerCase();
    let fieldValue = value as Field;

    if (e.currentTarget.classList.contains("clicked")) {
      setContriFields(contriFields.filter((field) => fieldValue !== field));
    } else {
      setContriFields([...contriFields, fieldValue]);
    }
    e.currentTarget.classList.toggle("clicked");
  };

  return (
    <CreateFieldView
      fields={requestFields}
      onClickFieldHandler={onClickFieldHandler}
    ></CreateFieldView>
  );
};

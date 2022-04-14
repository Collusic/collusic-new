import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { onChangeMeldoyFile } from "../utils/eventHandler";
import { CreateFieldView } from "../view/CreateFieldView";
import {
  getRequestProjectField,
  contributeFields,
} from "../model/createContributeProjectModel";
import { getDetailRequestState } from "../model/detailRequestProjectModel";
import type { Field } from "../types/requestProjectType";
import { CreateContentView } from "../view/CreateContentView";
import { CreateLyricView } from "../view/CreateLyricView";
import { CreateMelodyView } from "../view/CreateMelodyView";
import { TEST_API } from "../utils/axios";

export const CreateContributeViewModel: React.FC = () => {
  const createType = { kind: "contribute", description: "기여" };

  const requestProjectId = useRecoilValue(getDetailRequestState).id;
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

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();

    let [melody] = e.target.querySelectorAll("input");
    let [content, lyric] = e.target.querySelectorAll("textarea");
    let formData = new FormData();
    let melodyFile = melody.files[0];

    if (melodyFile === undefined) {
      melodyFile = new Blob();
    }
    formData.append("content", content.value);
    formData.append("fields", requestFields.join(","));
    formData.append("lyrics", lyric.value);
    formData.append("multipartFile", melodyFile);

    TEST_API.post(
      `/api/requestprojects/${requestProjectId}/contributeprojects`,
      formData
    ).then((e) => (window.location.href = "/main/requestprojects"));
  };

  return (
    <article className="contribute-container">
      <form
        method="post"
        onSubmit={onSubmitHandler}
        encType="multipart/form-data"
      >
        <CreateFieldView
          createType={createType}
          fields={requestFields}
          onClickFieldHandler={onClickFieldHandler}
        ></CreateFieldView>
        <CreateContentView createType={createType}></CreateContentView>
        <CreateLyricView />
        <CreateMelodyView onChangeFiles={onChangeMeldoyFile}></CreateMelodyView>
        <button className="submit-btn" type="submit">
          {createType.description}하기
        </button>
      </form>
    </article>
  );
};

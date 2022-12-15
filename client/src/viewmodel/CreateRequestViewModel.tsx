import React from "react";
import { useRecoilState } from "recoil";
import { onChangeMeldoyFile } from "../utils/eventHandler";

import { requestFieldState, requestGenreState, requestMoodState } from "../model/createRequestProjectModel";
import { genres, fields, moods } from "../utils/data/state";
import { CreateTitleView } from "../view/CreateTitleView";
import { CreateContentView } from "../view/CreateContentView";
import { CreateFieldView } from "../view/CreateFieldView";
import { CreateGenreView } from "../view/CreateGenreView";
import { CreateMoodView } from "../view/CreateMoodView";
import { CreateMelodyView } from "../view/CreateMelodyView";
import { CreateLyricView } from "../view/CreateLyricView";

import axios from "axios";

export const CreateRequestViewModel: React.FC = () => {
  const createType = { kind: "request", description: "요청" };

  const [requestFields, setRequestFields] = useRecoilState(requestFieldState);
  const [requestGenres, setRequestGenres] = useRecoilState(requestGenreState);
  const [requestMoods, setRequestMoods] = useRecoilState(requestMoodState);

  const onClickFieldHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    let value = e.currentTarget.firstChild?.nodeValue;
    value = value!.toLowerCase();

    if (e.currentTarget.classList.contains("clicked")) {
      setRequestFields(requestFields.filter((field) => value !== field));
    } else {
      setRequestFields([...requestFields, value]);
    }
    e.currentTarget.classList.toggle("clicked");
  };

  const onClickGenreHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    let value = e.currentTarget.firstChild?.nodeValue;
    value = value!.toLowerCase();

    if (e.currentTarget.classList.contains("clicked")) {
      setRequestGenres(requestGenres.filter((field) => value !== field));
    } else {
      setRequestGenres([...requestGenres, value]);
    }
    e.currentTarget.classList.toggle("clicked");
  };

  const onClickMoodHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    let value = e.currentTarget.firstChild?.nodeValue;
    value = value!.toLowerCase();

    if (e.currentTarget.classList.contains("clicked")) {
      setRequestMoods(requestMoods.filter((field) => value !== field));
    } else {
      setRequestMoods([...requestMoods, value]);
    }
    e.currentTarget.classList.toggle("clicked");
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();

    let [title, melody] = e.target.querySelectorAll("input");
    let [content, lyric] = e.target.querySelectorAll("textarea");
    let formData = new FormData();
    let melodyFile = melody.files[0];

    if (melodyFile === undefined) {
      melodyFile = new Blob();
    }

    formData.append("title", title.value);
    formData.append("content", content.value);
    formData.append("fields", requestFields.join(","));
    formData.append("genres", requestGenres.join(","));
    formData.append("moods", requestMoods.join(","));
    formData.append("lyrics", lyric.value);
    formData.append("multipartFile", melodyFile);

    axios
      .create({
        baseURL: "http://ec2-13-124-123-6.ap-northeast-2.compute.amazonaws.com:8080/",
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Custom-Header": "foobar",
        },
        timeout: 5000,
      })
      .post("/api/requestprojects", formData)
      .then(() => (window.location.href = "/main/requestprojects"));
  };

  return (
    <React.Fragment>
      <form method="post" onSubmit={onSubmitHandler} encType="multipart/form-data">
        <CreateTitleView />
        <CreateContentView createType={createType}></CreateContentView>
        <CreateMelodyView onChangeFiles={onChangeMeldoyFile} />
        <CreateLyricView />
        <CreateFieldView createType={createType} fields={fields} onClickFieldHandler={onClickFieldHandler} />
        <CreateGenreView genres={genres} onClickGenreHandler={onClickGenreHandler} />
        <CreateMoodView moods={moods} onClickMoodHandler={onClickMoodHandler} />
        <button className="submit-btn" type="submit">
          {createType.description}하기
        </button>
      </form>
    </React.Fragment>
  );
};

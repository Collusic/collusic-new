import React, { ClassType, useRef } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { ClassElement } from "typescript";

import {
  requestFieldState,
  requestGenreState,
  requestMoodState,
} from "../model/createRequestProjectModel";
import { genres, fields, moods } from "../utils/data/state";
import { CreateTitleView } from "../view/CreateTitleView";
import { CreateFieldView } from "../view/CreateFieldView";
import { CreateGenreView } from "../view/CreateGenreView";
import { CreateMoodView } from "../view/CreateMoodView";

export const CreateRequestViewModel: React.FC = () => {
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

  return (
    <React.Fragment>
      {/* <CreateTitleView />
      <CreateContextView />
      <CreateLyricView />
      <CreateMelodyView /> */}
      <CreateTitleView />
      <CreateFieldView
        fields={fields}
        onClickFieldHandler={onClickFieldHandler}
      />
      <CreateGenreView
        genres={genres}
        onClickGenreHandler={onClickGenreHandler}
      />
      <CreateMoodView moods={moods} onClickMoodHandler={onClickMoodHandler} />
    </React.Fragment>
  );
};

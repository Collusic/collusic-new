import React, { useState } from "react";
import {
  CreateContainer,
  RadioButton,
  SelectButton,
  Index,
  TitleInput,
  ContentTextArea,
  ButtonTitle,
  SubmitButton,
} from "./styled";
import FileUpload from "./fileupload";

const Create = () => {
  const [form, setForm] = useState({
    fieldList: [],
    genre: "",
    mood: "",
    file: {},
  });
  const [errors, setErrors] = useState([]);
  const [isFiled, setIsFiled] = useState(false);
  const fields = ["멜로디", "악기", "가사"];
  const moods = [
    "Uplifting",
    "Epic",
    "Powerful",
    "Happy",
    "Hopeful",
    "Love",
    "Playful",
    "Groovy",
    "Peaceful",
    "Serious",
    "Dramatic",
    "Tense",
    "Sad",
    "Dark",
  ];
  const genres = [
    "어쿠스틱",
    "블루스",
    "클래식",
    "컨트리",
    "일렉트로닉",
    "포크",
    "펑크",
    "힙합",
    "인디",
    "재즈",
    "라틴",
    "팝",
    "레게",
    "레트로",
    "락",
    "소울&알앤비",
  ];
  const fieldChoice = (e) => {
    if (form.fieldList.includes(e.target.innerHTML)) {
      let newFieldList = form.fieldList;
      newFieldList.splice(form.fieldList.indexOf(e.target.innerHTML), 1);
      setForm({
        ...form,
        fieldList: newFieldList,
      });
    } else {
      let newFieldList = form.fieldList;
      newFieldList.push(`${e.target.innerHTML}`);
      setForm({
        ...form,
        fieldList: newFieldList,
      });
    }
  };
  const genreChoice = (e) => {
    const parser = new DOMParser();
    const decodeString = parser.parseFromString(
      `<!doctype html><body>${e.target.innerHTML}`,
      "text/html"
    ).body.textContent;
    if (form.genre === decodeString) {
      setForm({
        ...form,
        genre: null,
      });
    } else {
      setForm({
        ...form,
        genre: decodeString,
      });
    }
  };
  const moodChoice = (e) => {
    const parser = new DOMParser();
    const decodeString = parser.parseFromString(
      `<!doctype html><body>${e.target.innerHTML}`,
      "text/html"
    ).body.textContent;
    if (form.mood === decodeString) {
      setForm({
        ...form,
        mood: null,
      });
    } else {
      setForm({
        ...form,
        mood: decodeString,
      });
    }
  };
  const fileChoice = (file) => {
    let newFile = [];
    newFile.push(file);
    setIsFiled(true);
    setForm({
      ...form,
      file: file,
    });
  };
  const occurredError = (err) => {
    const { file } = err[0];
    const { type } = err[0];
    alert(`${file.name} is ${type}`);
  };
  const cancelFile = (e) => {
    setForm({ ...form, file: {} });
  };
  return (
    <>
      <CreateContainer>
        <Index index="1"></Index>

        <div>
          <TitleInput
            placeholder="제목을 입력해주세요."
            type="text"
            style={{ display: "block" }}
          />
          <ContentTextArea
            rows="5"
            placeholder="내용을 입력해주세요 (최대300자)"
          ></ContentTextArea>
        </div>
        <Index index="2"></Index>
        <div>
          <ContentTextArea
            rows="10"
            placeholder="가사를 입력해주세요."
          ></ContentTextArea>
          <FileUpload
            isFiled={isFiled}
            files={form.file}
            errors={errors}
            setFiles={fileChoice}
            setErrors={occurredError}
            cancelFile={cancelFile}
          ></FileUpload>
        </div>
        <Index index="3"></Index>
        <div style={{ width: "60%" }}>
          <ButtonTitle>요청 분야</ButtonTitle>
          <div>
            {fields.map((field, i) => {
              return (
                <SelectButton
                  onClick={fieldChoice}
                  arr={form.fieldList}
                  value={field}
                  key={i}
                />
              );
            })}
          </div>
          <div>
            <ButtonTitle>장르</ButtonTitle>
            {genres.map((genre, i) => {
              return (
                <RadioButton
                  onClick={genreChoice}
                  keyword={form.genre}
                  value={genre}
                  key={i}
                />
              );
            })}
          </div>
          <div>
            <ButtonTitle>분위기</ButtonTitle>
            {moods.map((mood, i) => {
              return (
                <RadioButton
                  title="분위기"
                  onClick={moodChoice}
                  keyword={form.mood}
                  value={mood}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      </CreateContainer>
      <SubmitButton>요청하기</SubmitButton>
    </>
  );
};
export default Create;

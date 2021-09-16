import React, { useState } from "react";
import axios from "axios";
import styled from "./styled";
import upload from "assets/uploadButton.png";

function Uploadfiles() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post(
        "http://localhost:3000/project/contributeProject",
        formData
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <styled.UploadMidi>
      <styled.UploadButton
        onClick={uploadFile}
        src={upload}
      ></styled.UploadButton>
      <styled.InputMidi type="file" onChange={saveFile}></styled.InputMidi>
      <styled.PlaceHolder>
        {file ? fileName : "MIDI파일을 드래그하여 업로드 해주세요(최대1GB)"}
      </styled.PlaceHolder>
    </styled.UploadMidi>
  );
}

export default Uploadfiles;

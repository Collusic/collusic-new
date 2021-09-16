import React, { useState } from "react";
import styled from "./styled";
import Uploadfiles from "./UploadFiles";

function LeftBox() {
  return (
    <styled.LeftBox>
      <styled.InputContext placeholder="내용을 입력해 주세요 (최대 150자)"></styled.InputContext>
      <styled.InputLyrics placeholder="가사를 입력해 주세요."></styled.InputLyrics>
      <Uploadfiles></Uploadfiles>
    </styled.LeftBox>
  );
}

export default LeftBox;

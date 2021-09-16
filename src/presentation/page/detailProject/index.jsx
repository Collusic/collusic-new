import React, { useState, useEffect } from "react";
import styled from "./styled";
import LeftBox from "./LeftBox";
import RightBox from "./RightBox";

function DetailProject({ id }) {
  return (
    <>
      <styled.Window>
        <LeftBox></LeftBox>
        <RightBox></RightBox>
      </styled.Window>
    </>
  );
}

export default DetailProject;

import React from "react";
import styled from "./styled";
import LeftBox from "./LeftBox";
import RightBox from "../detailProject/RightBox";

function CreateContributeProject() {
  return (
    <styled.Window>
      <LeftBox></LeftBox>
      <RightBox></RightBox>
    </styled.Window>
  );
}

export default CreateContributeProject;

import React from "react";
import styled from "./styled";
import ProjectList from "./ProjectList";

function LeftBox() {
  return (
    <styled.LeftBox>
      <styled.LeftHeader>
        <styled.HeaderName>Track list</styled.HeaderName>
        <styled.ContributeButton>기여하기</styled.ContributeButton>
      </styled.LeftHeader>
      <ProjectList></ProjectList>
    </styled.LeftBox>
  );
}

export default LeftBox;

import React, { RefObject } from "react";

interface ObservationTargetProps {
  currentRef: RefObject<HTMLDivElement>;
}

function ObservationTarget({ currentRef }: ObservationTargetProps) {
  return <div ref={currentRef} />;
}

export default ObservationTarget;

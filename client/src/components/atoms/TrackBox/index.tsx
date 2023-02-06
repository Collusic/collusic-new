import React, { FormEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import "./style.scss";

interface TrackBoxProps {
  currentTime: number;
  isRecording: boolean;
  onTrackBoxInput(e: FormEvent): void;
}
function TrackBox({ currentTime, isRecording, onTrackBoxInput }: TrackBoxProps) {
  const [time, setTime] = useState(currentTime || 0);
  const boxRef = useRef<HTMLInputElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const fillStyle = {
    width: (currentTime / 30) * Number(boxRef.current?.getBoundingClientRect().width),
  };

  const handleTrackBoxForm = (e: FormEvent) => {
    setTime(Number((e.target as HTMLInputElement).value));
    onTrackBoxInput(e);
  };

  useEffect(() => {}, [time]);

  return (
    <>
      <input className={`${isRecording ? "recording-box" : "track-box"}`} onInput={handleTrackBoxForm} ref={boxRef} />
      <div className={`${isRecording ? "record-fill" : "box-fill"}`} style={fillStyle} ref={fillRef} />
    </>
  );
}

export default TrackBox;

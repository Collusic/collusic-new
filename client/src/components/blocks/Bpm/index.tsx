import React, { FormEventHandler } from "react";

import Span from "components/atoms/Span";
import "./style.scss";

interface BpmProps {
  bpm: number;
  inputHandler: FormEventHandler;
  sliderRef: React.RefObject<HTMLInputElement>;
  sliderValueRef: React.RefObject<HTMLSpanElement>;
}

function Bpm({ bpm, inputHandler, sliderRef, sliderValueRef }: BpmProps) {
  return (
    <div id="bpm">
      <Span>BPM</Span>
      <div className="slide-container">
        <input className="slider" type="range" min="0" max="240" step="1" onInput={inputHandler} ref={sliderRef} />
        <span id="value" ref={sliderValueRef}>
          {bpm}
        </span>
        <div className="slider-bottom">
          <span>30</span>
          <span>240</span>
        </div>
      </div>
    </div>
  );
}

export default Bpm;

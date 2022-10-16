import React, { FormEvent, FormEventHandler, useEffect, useRef, useState } from "react";

import Span from "components/atoms/Span";
import { getSliderHandlePosition } from "utils/slider";
import "./style.scss";

interface BpmProps {
  bpmState: number;
  inputHandler: FormEventHandler;
}

function Bpm({ bpmState, inputHandler }: BpmProps) {
  const [bpm, setBpm] = useState(bpmState || 0);
  const sliderRef = useRef<HTMLInputElement>(null);
  const sliderValueRef = useRef<HTMLOutputElement>(null);

  // todo: 현재 bpm 알려주는 span 태그 클릭 시 sliderHandle이 동작되지 않는 에러
  // todo: 현재 bpm 만큼 진행도 흰색배경으로 표시

  const formHandler = (e: FormEvent) => {
    setBpm(Number((e.target as HTMLInputElement).value));
    inputHandler(e);
  };

  useEffect(() => {
    (sliderRef.current as HTMLInputElement).value = String(bpm);
  });

  useEffect(() => {
    (sliderValueRef.current as HTMLOutputElement).style.left = getSliderHandlePosition(
      0,
      240,
      bpm,
      Number(sliderRef.current?.getBoundingClientRect().width) - 40,
    );
  }, [bpm]);

  return (
    <div id="bpm">
      <Span>BPM</Span>
      <div className="slide-container">
        <input
          className="slider"
          type="range"
          min="0"
          max="240"
          step="1"
          name="bpm"
          onInput={formHandler}
          ref={sliderRef}
        />
        <output id="value" name="value" htmlFor="bpm" ref={sliderValueRef}>
          {bpm}
        </output>
        <div className="slider-bottom">
          <span>30</span>
          <span>240</span>
        </div>
      </div>
    </div>
  );
}

export default Bpm;

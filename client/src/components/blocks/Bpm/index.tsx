import React, { FormEvent, useEffect, useRef, useState } from "react";

import Span from "components/atoms/Span";
import { getSliderHandlePosition } from "utils/slider";
import "./style.scss";

// interface BpmProps {
//   inputHandler: FormEventHandler;
// }

function Bpm() {
  const [sliderValue, setSliderValue] = useState(60);
  const sliderRef = useRef<HTMLInputElement>(null);
  const sliderValueRef = useRef<HTMLSpanElement>(null);

  const inputHandler = (e: FormEvent) => {
    setSliderValue(Number((e.target as HTMLInputElement).value));

    (sliderValueRef.current as HTMLSpanElement).style.left = getSliderHandlePosition(
      0,
      240,
      Number((e.target as HTMLInputElement).value),
      Number(sliderRef.current?.getBoundingClientRect().width) - 40,
    );
  };

  useEffect(() => {
    (sliderValueRef.current as HTMLSpanElement).style.left = getSliderHandlePosition(
      0,
      240,
      Number(sliderRef.current!.value),
      Number(sliderRef.current?.getBoundingClientRect().width) - 40,
    );
  }, []);

  return (
    <div id="bpm">
      <Span>BPM</Span>
      <div className="slide-container">
        <input className="slider" type="range" min="0" max="240" step="1" onInput={inputHandler} ref={sliderRef} />
        <span id="value" ref={sliderValueRef}>
          {sliderValue}
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

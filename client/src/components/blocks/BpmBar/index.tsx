import { FormEvent, FormEventHandler, useEffect, useRef, useState } from "react";

import Span from "components/atoms/Span";
import { getSliderHandlePosition } from "utils/slider";
import "./style.scss";

interface BpmProps {
  bpmState: number;
  onBpmInput: FormEventHandler;
}

function BpmBar({ bpmState, onBpmInput }: BpmProps) {
  const [bpm, setBpm] = useState(bpmState || 0);
  const sliderRef = useRef<HTMLInputElement>(null);
  const sliderValueRef = useRef<HTMLOutputElement>(null);
  const bpmFillRef = useRef<HTMLDivElement>(null);

  // todo: 현재 bpm 알려주는 span 태그 클릭 시 sliderHandle이 동작되지 않는 에러
  // todo: 진행된 bpm 상태바 클릭 시 작동 안되는 에러

  const handleForm = (e: FormEvent) => {
    setBpm(Number((e.target as HTMLInputElement).value));
    onBpmInput(e);
  };

  useEffect(() => {
    (sliderRef.current as HTMLInputElement).value = String(bpm);
  });

  // todo: 중복 제거
  useEffect(() => {
    (sliderValueRef.current as HTMLOutputElement).style.left = getSliderHandlePosition(
      30,
      240,
      bpm,
      Number(sliderRef.current?.getBoundingClientRect().width),
    );

    (bpmFillRef.current as HTMLDivElement).style.width = getSliderHandlePosition(
      30,
      240,
      bpm,
      Number(sliderRef.current?.getBoundingClientRect().width),
    );
  }, [bpm]);

  return (
    <div id="bpm-bar">
      <Span>BPM</Span>
      <div className="slide-container">
        <input
          className="slider"
          type="range"
          min="30"
          max="240"
          step="1"
          name="bpm"
          onInput={handleForm}
          ref={sliderRef}
        />
        <div className="bpm-fill" ref={bpmFillRef} />
        <output id="output" name="output" htmlFor="bpm" ref={sliderValueRef}>
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

export default BpmBar;

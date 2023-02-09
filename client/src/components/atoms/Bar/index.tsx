import { FormEvent, FormEventHandler, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { getSliderHandlePosition } from "utils/slider";
import "./style.scss";

interface BarProps {
  targetState: number;
  min: number;
  max: number;
  isShowTarget?: boolean;
  onBarInput: FormEventHandler;
  type?: string;
}

function Bar({ targetState, min, max, isShowTarget, onBarInput, type }: BarProps) {
  const [target, setTarget] = useState(targetState || 0);
  const sliderRef = useRef<HTMLInputElement>(null);
  const sliderValueRef = useRef<HTMLOutputElement>(null);
  const targetFillRef = useRef<HTMLDivElement>(null);

  // TODO: 현재 bpm 알려주는 span 태그 클릭 시 sliderHandle이 동작되지 않는 에러
  // TODO: 진행된 bpm 상태바 클릭 시 작동 안되는 에러

  const handleForm = (e: FormEvent) => {
    setTarget(Number((e.target as HTMLInputElement).value));
    onBarInput(e);
  };

  useEffect(() => {
    (sliderRef.current as HTMLInputElement).value = String(target);
  });

  // TODO: 중복 제거
  useEffect(() => {
    isShowTarget &&
      ((sliderValueRef.current as HTMLOutputElement).style.left = getSliderHandlePosition(
        min,
        max,
        target,
        Number(sliderRef.current?.getBoundingClientRect().width),
        type,
      ));

    (targetFillRef.current as HTMLDivElement).style.width = getSliderHandlePosition(
      min,
      max,
      target,
      Number(sliderRef.current?.getBoundingClientRect().width),
      type,
    );
  }, [target]);

  return (
    <div className={classNames("bar", { "bpm-bar": type === "bpm" }, { "sound-bar": type === "sound" })}>
      <div className="slide-container">
        <input
          className={classNames({ "bpm-slider": type === "bpm" }, { "sound-slider": type === "sound" })}
          type="range"
          min={min}
          max={max}
          step="1"
          name="bar"
          onInput={handleForm}
          ref={sliderRef}
        />
        <div
          className={classNames({ "bpm-fill": type === "bpm" }, { "sound-fill": type === "sound" })}
          ref={targetFillRef}
        />
        {isShowTarget && (
          <output id="output" name="output" htmlFor="bar" ref={sliderValueRef}>
            {target}
          </output>
        )}
      </div>
    </div>
  );
}

Bar.defaultProps = {
  isShowTarget: true,
  type: "bpm",
};

export default Bar;

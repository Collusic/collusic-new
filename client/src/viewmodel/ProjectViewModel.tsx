import React, { FormEvent, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

import { bpmState } from "model/projectModel";
import { getSliderHandlePosition } from "utils/slider";
import Bpm from "components/blocks/Bpm";

function ProjectViewModel() {
  const [bpm, setBpm] = useRecoilState(bpmState);
  const sliderRef = useRef<HTMLInputElement>(null);
  const sliderValueRef = useRef<HTMLSpanElement>(null);

  const inputHandler = (e: FormEvent) => {
    setBpm(Number((e.target as HTMLInputElement).value));

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

  return <Bpm bpm={bpm} inputHandler={inputHandler} sliderRef={sliderRef} sliderValueRef={sliderRef} />;
}

export default ProjectViewModel;

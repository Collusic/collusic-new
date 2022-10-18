import React, { FormEvent } from "react";
import { useRecoilState } from "recoil";

import { bpmState } from "model/projectModel";
import Bpm from "components/blocks/Bpm";

function ProjectViewModel() {
  const [bpm, setBpm] = useRecoilState(bpmState);

  const inputHandler = (e: FormEvent) => {
    // todo: setBpm 디바운싱 처리
    setBpm(Number((e.target as HTMLInputElement).value));
  };

  return <Bpm bpmState={bpm} inputHandler={inputHandler} />;
}

export default ProjectViewModel;

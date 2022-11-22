import React, { FormEvent, MouseEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { bpmState, selectedTrackState, tagListState } from "model/projectModel";
import ProjectSetting from "components/blocks/ProjectSetting";

function ProjectViewModel() {
  const [bpm, setBpm] = useRecoilState(bpmState);
  const [selectedTrack, setSelectedTrack] = useRecoilState(selectedTrackState);
  const tracks = useRecoilValue(tagListState);

  const handleDeviceClick = (e: MouseEvent) => {
    console.log(e);
  };
  const handleTrackClick = (e: MouseEvent) => {
    console.log(e);
  };
  const handleBtnClick = (e: MouseEvent) => {
    console.log(e);
  };
  const handleBpmInput = (e: FormEvent) => {
    console.log((e.currentTarget as HTMLInputElement).value);
  };

  return (
    <ProjectSetting
      onDeviceClick={handleDeviceClick}
      onTrackClick={handleDeviceClick}
      onBtnClick={handleBtnClick}
      onBpmInput={handleBpmInput}
      bpmState={bpm}
      selectedTrack={selectedTrack}
      tracks={tracks}
    />
  );
}

export default ProjectViewModel;

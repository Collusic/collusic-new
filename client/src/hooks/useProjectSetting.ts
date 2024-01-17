import { FormEvent, MouseEvent, useState } from "react";
import { useRecoilState } from "recoil";

import type { Track } from "types/projectType";

import { bpmState } from "model/projectModel";
import useInputDevice from "hooks/useInputDevice";

const useProjectSetting = () => {
  const [title, setTitle] = useState<string>();
  const [bpm, setBpm] = useRecoilState(bpmState);
  const [trackTag, setTrackTag] = useState<Track>("");

  const { inputDeviceId, inputTextDevice, handleDeviceClick } = useInputDevice();

  // 프로젝트 이름 설정
  const handleTitleInput = (e: FormEvent) => {
    setTitle((e.currentTarget as HTMLInputElement).value);
  };

  // 프로젝트 bpm 설정
  const handleBpmInput = (e: FormEvent) => {
    setBpm(Number((e.currentTarget as HTMLInputElement).value));
  };

  // 등록할 트랙 태그 선택
  const handleTrackTagSelect = (e: MouseEvent) => {
    if (!e.currentTarget.lastChild) {
      alert("트랙을 다시 선택해주세요.");
    }
    setTrackTag(e.currentTarget.lastChild?.nodeValue as Track);
  };

  return {
    title,
    bpm,
    inputDeviceId,
    inputTextDevice,
    trackTag,
    handleTitleInput,
    handleBpmInput,
    handleDeviceClick,
    handleTrackTagSelect,
  };
};

export default useProjectSetting;

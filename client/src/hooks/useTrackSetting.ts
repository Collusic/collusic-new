import { useState, MouseEvent, FormEvent } from "react";

import type { Track } from "types/projectType";
import useInputDevice from "hooks/useInputDevice";

const useTrackSetting = () => {
  const [title, setTitle] = useState("");
  const [trackTag, setTrackTag] = useState<Track>("");

  const { inputDeviceId, inputTextDevice, handleDeviceClick } = useInputDevice();

  // 프로젝트 이름 설정
  const handleTitleInput = (e: FormEvent) => {
    setTitle((e.currentTarget as HTMLInputElement).value);
  };

  // 등록할 트랙 태그 선택
  const handleTrackTagSelect = (e: MouseEvent) => {
    if (!e.currentTarget.lastChild) {
      alert("트랙을 다시 선택해주세요.");
    }
    setTrackTag(e.currentTarget.lastChild?.nodeValue as Track);
  };

  // 프로젝트 생성하기 버튼 클릭
  const handleSettingSubmit = () => {};

  return {
    title,
    inputDeviceId,
    inputTextDevice,
    trackTag,
    handleTitleInput,
    handleDeviceClick,
    handleTrackTagSelect,
    handleSettingSubmit,
  };
};

export default useTrackSetting;

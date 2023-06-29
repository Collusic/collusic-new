import { useState, MouseEvent, FormEvent } from "react";
import { useRecoilState } from "recoil";

import { inputDeviceTextState } from "model/projectModel";
import type { Track } from "types/projectType";

const useTrackSetting = () => {
  const [title, setTitle] = useState("");
  const [trackTag, setTrackTag] = useState<Track>("");
  const [inputDeviceId, setInputDeviceId] = useState("");
  const [inputTextDevice, setInputTextDevice] = useRecoilState(inputDeviceTextState);

  // 프로젝트 이름 설정
  const handleTitleInput = (e: FormEvent) => {
    setTitle((e.currentTarget as HTMLInputElement).value);
  };

  // 입력장치 선택
  const handleDeviceClick = (deviceId: string, deviceName: string) => {
    setInputDeviceId(deviceId);
    setInputTextDevice(deviceName);
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

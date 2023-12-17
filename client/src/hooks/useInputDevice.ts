import { useState } from "react";
import { useRecoilState } from "recoil";

import { inputDeviceTextState } from "model/projectModel";

const useInputDevice = () => {
  const [inputDeviceId, setInputDeviceId] = useState("");
  const [inputTextDevice, setInputTextDevice] = useRecoilState(inputDeviceTextState);

  // 입력장치 선택
  const handleDeviceClick = (deviceId: string, deviceName: string) => {
    setInputDeviceId(deviceId);
    setInputTextDevice(deviceName);
  };

  return { inputDeviceId, inputTextDevice, setInputTextDevice, handleDeviceClick };
};

export default useInputDevice;

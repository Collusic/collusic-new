import React, { useEffect, useState } from "react";
import classNames from "classnames";

import "./style.scss";
import Span from "components/atoms/Span";

interface RecordDeviceProps {
  onDeviceClick: (deviceId: string, deviceName: string) => void;
  inputTextDevice: string;
}

function RecordDevice({ onDeviceClick, inputTextDevice }: RecordDeviceProps) {
  const [deviceList, setDeviceList] = useState<MediaDeviceInfo[]>([]);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleBtnClick = () => {
    if (!showDropDown) setShowDropDown(true);
    else setShowDropDown(false);
  };

  useEffect(() => {
    async function getMedia() {
      let mediaDevices = null;
      try {
        mediaDevices = await navigator.mediaDevices.enumerateDevices();
        const audioDevices = mediaDevices.filter((mediaDevice) => mediaDevice.kind === "audioinput");
        setDeviceList(audioDevices);
      } catch (err) {
        console.log(err);
        alert("녹음 가능한 입력장치를 찾을 수 없습니다.");
      }
    }
    getMedia();
  }, []);

  return (
    <div id="record-device">
      <Span>입력장치</Span>
      <div className="selected-device">
        <span>{inputTextDevice}</span>
        <button type="button" className={classNames({ "rotate-button": showDropDown })} onClick={handleBtnClick}>
          <img src={`${process.env.PUBLIC_URL}/assets/arrow_down/arrow_down.png`} alt="record device" />
        </button>
      </div>
      <div className={classNames("device-list", { "hidden-device-list": !showDropDown })}>
        <div className="scroll-box">
          <ul>
            {deviceList.map((device) => (
              <li
                onClick={() => {
                  onDeviceClick(device.deviceId, device.label);
                }}
                onKeyDown={() => {
                  onDeviceClick(device.deviceId, device.label);
                }}
                key={device.deviceId}
              >
                {device.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecordDevice;
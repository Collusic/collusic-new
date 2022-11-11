import React, { KeyboardEventHandler, MouseEventHandler, useEffect, useState } from "react";
import classNames from "classnames";

import ArrowUpImg from "../../../../public/assets/arrow_down/arrow_down.png";
import "./style.scss";
import Span from "components/atoms/Span";

interface RecordDeviceProps {
  onDeviceClick: MouseEventHandler<HTMLUListElement> | KeyboardEventHandler<HTMLUListElement>;
}

function RecordDevice({ onDeviceClick }: RecordDeviceProps) {
  const [deviceList, setDeviceList] = useState<MediaDeviceInfo[]>([]);
  const [isOpenDeviceList, setIsOpenDeviceList] = useState(false);
  const [selectedDevice] = useState("입력장치를 선택해주세요.");

  const handleBtnClick = () => {
    if (isOpenDeviceList === false) setIsOpenDeviceList(true);
    else setIsOpenDeviceList(false);
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
        <span>{selectedDevice}</span>
        <button type="button" className={classNames({ "rotate-button": isOpenDeviceList })} onClick={handleBtnClick}>
          <img src={ArrowUpImg} alt="record device" />
        </button>
      </div>
      <div className={classNames("device-list", { "hidden-device-list": !isOpenDeviceList })}>
        <div className="scroll-box">
          <ul onClick={onDeviceClick as MouseEventHandler} onKeyDown={onDeviceClick as KeyboardEventHandler}>
            {deviceList.map((device) => (
              <li key={device.deviceId}>{device.label}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecordDevice;

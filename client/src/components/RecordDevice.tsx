import React, { KeyboardEventHandler, MouseEventHandler, useEffect, useState } from "react";
import classNames from "classnames";

import ArrowUpImg from "../../public/assets/arrow_down/arrow_down.png";
import "utils/style/recordDevice.scss";

interface RecordDeviceProps {
  clickHandler: MouseEventHandler<HTMLUListElement> | KeyboardEventHandler<HTMLUListElement>;
}

function RecordDevice({ clickHandler }: RecordDeviceProps) {
  const [deviceList, setDeviceList] = useState<MediaDeviceInfo[]>([]);
  const [isOpenDeviceList, setIsOpenDeviceList] = useState(false);
  const [selectedDevice] = useState("입력장치를 선택해주세요.");

  const buttonClickHandler = () => {
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
    <>
      <div className="selected-device">
        <span>{selectedDevice}</span>
        <button
          type="button"
          className={classNames({ "rotate-button": isOpenDeviceList })}
          onClick={buttonClickHandler}
        >
          <img src={ArrowUpImg} alt="record device" />
        </button>
      </div>
      <div className={classNames("device-list", { "hidden-device-list": !isOpenDeviceList })}>
        <div className="scroll-box">
          <ul onClick={clickHandler as MouseEventHandler} onKeyDown={clickHandler as KeyboardEventHandler}>
            {deviceList.map((device) => (
              <li key={device.deviceId}>{device.label}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default RecordDevice;

import React, { MouseEventHandler } from "react";
import classNames from "classnames";

import Locked from "../../../../public/assets/locker/locked.svg";
import UnLocked from "../../../../public/assets/locker/unlocked.svg";
import "./style.scss";

interface ToggleProps {
  isLocked: boolean;
  handleBtnClick: MouseEventHandler;
}

function Toggle({ isLocked, handleBtnClick }: ToggleProps) {
  return (
    <button type="button" className={classNames("toggle", { on: !isLocked })} onClick={handleBtnClick}>
      <span className={classNames("lock", { on: !isLocked })}>
        <img src={Locked} alt="locked" className={classNames("locked", { on: !isLocked })} />
        <img src={UnLocked} alt="unlocked" className={classNames("unlocked", { on: !isLocked })} />
      </span>
    </button>
  );
}

export default Toggle;

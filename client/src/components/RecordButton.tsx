import React, { useState, useEffect, useRef, MouseEventHandler } from "react";
import classNames from "classnames";

import MikeImg from "../../public/assets/mike/mike.svg";
import "utils/style/recordButton.scss";

interface RecordButtonProps {
  isStartedRecording: boolean;
  clickHandler: MouseEventHandler;
}

function RecordButton({ isStartedRecording, clickHandler }: RecordButtonProps) {
  const [count, setCount] = useState(3);
  const [isStartCountDown, setIsStartCountDown] = useState(false);
  const countDownInterval = useRef<NodeJS.Timer | null>(null);

  const buttonClickHandler = (e: React.MouseEvent) => {
    setIsStartCountDown(true);
    clickHandler(e);
  };

  useEffect(() => {
    if (isStartCountDown === true) {
      countDownInterval.current = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    }
  }, [isStartCountDown]);

  useEffect(() => {
    if (count === 0) {
      clearInterval(countDownInterval.current as NodeJS.Timer);
      countDownInterval.current = null;
      setIsStartCountDown(false);
      setCount(3);
    }
  }, [count]);

  return (
    <div className={classNames("outside-round", { hidden: isStartedRecording })}>
      <div className="inside-round">
        <button type="button" className="record-btn" onClick={buttonClickHandler}>
          <img src={MikeImg} alt="record" className={classNames("mike-img", { hidden: isStartCountDown })} />
          <p className={classNames("count-down", { hidden: !isStartCountDown })}>{count}</p>
        </button>
      </div>
    </div>
  );
}

export default RecordButton;

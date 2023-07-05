import { useState, useEffect, useRef, MouseEventHandler } from "react";
import classNames from "classnames";

import "./style.scss";

interface RecordButtonProps {
  handleBtnClickEvent: MouseEventHandler;
  onEndTimer: () => void;
}

function RecordButton({ handleBtnClickEvent, onEndTimer }: RecordButtonProps) {
  const [count, setCount] = useState(3);
  const [isStartCountDown, setIsStartCountDown] = useState(false);
  const countDownInterval = useRef<NodeJS.Timer | null>(null);

  const handleBtnClick = (e: React.MouseEvent) => {
    setIsStartCountDown(true);
    handleBtnClickEvent(e);
  };

  useEffect(() => {
    if (isStartCountDown === true) {
      countDownInterval.current = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    }
  }, [isStartCountDown]);

  useEffect(() => {
    if (count === 1) {
      clearInterval(countDownInterval.current as NodeJS.Timer);
      countDownInterval.current = null;
      onEndTimer();
    } else if (count === 0) {
      setIsStartCountDown(false);
    }
  }, [count]);

  return (
    <div className="outside-round">
      <div className="inside-round">
        <button type="button" className="record-btn" onClick={handleBtnClick}>
          <img
            src="/assets/mike/mike.svg"
            alt="record"
            className={classNames("mike-img", { hidden: isStartCountDown })}
          />
          <p className={classNames("count-down", { hidden: !isStartCountDown })}>{count}</p>
        </button>
      </div>
    </div>
  );
}

export default RecordButton;

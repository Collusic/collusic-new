import { MouseEventHandler } from "react";
import classNames from "classnames";

import "./style.scss";

interface RecordButtonProps {
  isTimerStart: boolean;
  timerCount: number;
  onClick: MouseEventHandler;
}

function RecordButton({ isTimerStart, timerCount, onClick }: RecordButtonProps) {
  return (
    <div className="outside-round">
      <div className="inside-round">
        <button type="button" className="record-btn" onClick={onClick}>
          <img src="/assets/mike/mike.svg" alt="record" className={classNames("mike-img", { hidden: isTimerStart })} />
          <p className={classNames("count-down", { hidden: !isTimerStart })}>{timerCount}</p>
        </button>
      </div>
    </div>
  );
}

export default RecordButton;

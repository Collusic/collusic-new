import React, { useState, useEffect, useRef } from "react";

import MikeImg from "../../public/assets/mike/mike.svg";

function RecordButton() {
  const [count, setCount] = useState(3);
  const [isStartCountDown, setIsStartCountDown] = useState(false);
  const countDownInterval = useRef<NodeJS.Timer | null>(null);

  const buttonClickHandler = () => {
    setIsStartCountDown(true);
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
    }
  }, [count]);

  return (
    <div className="outside-round">
      <div className="inside-round">
        <button type="submit" className="record-btn" onClick={buttonClickHandler}>
          <img src={MikeImg} alt="record" />
          <p className="count-down">{count}</p>
        </button>
      </div>
    </div>
  );
}

export default RecordButton;

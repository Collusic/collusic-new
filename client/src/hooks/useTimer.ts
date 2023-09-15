import { useEffect, useRef, useState } from "react";

const useTimer = (count: number) => {
  const [time, setTime] = useState(count);
  const [didStart, setDidStart] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const timerId = useRef<NodeJS.Timer>();

  // 시작
  const start = () => {
    if (didStart) {
      resume();
    } else {
      restart();
    }
  };

  // 일시정지
  const pause = () => {
    setIsRunning(false);
  };

  // 재개
  const resume = () => {
    setIsRunning(true);
  };

  // 다시 시작
  const restart = () => {
    setTime(count);
    setIsExpired(false);
    setDidStart(true);
    setIsRunning(true);
  };

  // 초기화
  const reset = () => {
    setTime(count);
    setIsRunning(false);
    setIsExpired(true);
  };

  useEffect(() => {
    if (isRunning) {
      timerId.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerId.current);
  }, [isRunning]);

  useEffect(() => {
    if (time < count) {
      setDidStart(true);
    }

    if (time <= 0) {
      clearInterval(timerId.current);
      setIsRunning(false);
      setIsExpired(true);
    }
  }, [time]);

  return {
    isRunning,
    didStart,
    isExpired,
    time,
    start,
    pause,
    resume,
    restart,
    reset,
  };
};

export default useTimer;

import { useEffect, useRef, useState } from "react";

const useTimer = (value: number) => {
  const [time, setTime] = useState(value);
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const timerId = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (isStart) {
      setIsEnd(false);

      timerId.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timerId.current);
  }, [isStart]);

  useEffect(() => {
    if (time <= 0) {
      setIsEnd(true);
      clearInterval(timerId.current);
      setIsStart(false);
      setTime(value);
    }
  }, [time]);

  return { isEnd, time, startTimer: () => setIsStart(true), stopTimer: () => setIsStart(false) };
};

export default useTimer;

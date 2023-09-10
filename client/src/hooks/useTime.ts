import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { timeState } from "model/audioModel";

const useTime = (): [number, (prev: number) => void] => {
  const [time, setTime] = useRecoilState(timeState);

  useEffect(() => {
    return () => {
      setTime(0);
    };
  }, []);

  return [
    time,
    (prev: number) => {
      setTime(Number(prev.toFixed(3)));
    },
  ];
};

export default useTime;

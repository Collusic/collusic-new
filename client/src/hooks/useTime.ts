import { Dispatch, SetStateAction, useState } from "react";

const useTime = (): [number, (prev: number) => void] => {
  const [time, setTime] = useState(0);

  return [
    time,
    (prev: number) => {
      setTime(Number(prev.toFixed(3)));
    },
  ];
};

export default useTime;

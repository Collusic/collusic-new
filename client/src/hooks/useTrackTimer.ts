import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { isTrackPlayingState, timeState } from "model/audioModel";

/**
 *  TrackPlayer를 1초 간격으로 재생하기 위해 사용하는 hook
 */
const useTrackTimer = () => {
  const timerId = useRef<NodeJS.Timer>();
  const [trackTime, setTrackTime] = useRecoilState(timeState);
  const [isTrackPlaying, setIsTrackPlaying] = useRecoilState(isTrackPlayingState);

  const startTrackTimer = () => {
    setIsTrackPlaying(true);
  };

  const stopTrackTimer = () => {
    setIsTrackPlaying(false);
  };

  const resetTrackTimer = () => {
    setIsTrackPlaying(false);
    setTrackTime(0);
  };

  useEffect(() => {
    if (isTrackPlaying) {
      timerId.current = setInterval(() => {
        setTrackTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerId.current);
      timerId.current = undefined;
    }
  }, [isTrackPlaying, setTrackTime]);

  useEffect(() => {
    return () => clearInterval(timerId.current);
  }, []);

  return {
    trackTime,
    setTrackTime,
    startTrackTimer,
    stopTrackTimer,
    resetTrackTimer,
  };
};

export default useTrackTimer;

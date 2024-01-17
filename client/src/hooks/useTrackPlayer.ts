import { useCallback, useEffect } from "react";

import useAudios from "./useAudios";
import useTrackTimer from "./useTrackTimer";

/**
 *  TrackPlayer의 재생 시간과 오디오를 함께 조작(동기화)하기 위한 hook
 */
const useTrackPlayer = ({ bpm, isRecording }: { bpm: number; isRecording?: boolean }) => {
  const { isAudioPlaying, changeAudioTime, playAudio, stopAudio, resetAudio } = useAudios();
  const { trackTime, setTrackTime, startTrackTimer, stopTrackTimer, resetTrackTimer } = useTrackTimer();

  // bpm에 따른 전체 마디 계산
  const totalMeasure = Math.floor(bpm / 2) + 1;
  const measure = trackTime / (30 / totalMeasure);

  // 현재 재생 중인 마디 값이 바뀌면 TrackPlayer, 오디오의 재생 시간도 변경
  const setMeasure = useCallback(
    (nextMeasure: number) => {
      const currentTime = nextMeasure * (30 / totalMeasure);
      setTrackTime(Math.floor(currentTime));
      changeAudioTime(Number(currentTime.toFixed(3)));
    },
    [changeAudioTime],
  );

  // TrackPlayer 초기화
  const resetTrackPlayer = () => {
    resetTrackTimer();
    resetAudio();
  };

  // 재생시간이 30초 넘어가면 TrackPlayer 초기화 (트랙 최대 길이 30초)
  useEffect(() => {
    if (trackTime > 30) {
      resetTrackPlayer();
    }
  }, [trackTime]);

  // 오디오와 TrackPlayer 재생 시간 동기화
  useEffect(() => {
    if (isAudioPlaying) {
      startTrackTimer();
    } else {
      stopTrackTimer();
    }
  }, [isAudioPlaying]);

  // 녹음 상태와 오디오 재생 상태 동기화
  useEffect(() => {
    if (isRecording) {
      // 녹음 시작하면 TrackPlayer 초기화 후 오디오 재생
      resetTrackPlayer();
      playAudio();
    } else {
      // 녹음 끝나면 오디오 멈춤
      stopAudio();
    }
  }, [isRecording]);

  // 언마운트 시 TrackPlayer 초기화
  useEffect(() => {
    return () => resetTrackPlayer();
  }, []);

  return {
    measure,
    setMeasure,
    totalMeasure,
  };
};

export default useTrackPlayer;

/* eslint-disable no-param-reassign */
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

import type { AudioType, AudioSourceType } from "types/audioType";

import { TRACK_API } from "api/axios";
import { audioListState, isAudioPlayingState } from "model/audioModel";
import { INITIAL_AUDIO_VOLUME } from "constants/audio";
import throttle from "utils/throttle";

const useAudios = () => {
  const [audioList, setAudioList] = useRecoilState<AudioType[]>(audioListState);
  const [isAudioPlaying, setIsAudioPlaying] = useRecoilState(isAudioPlayingState);

  const setAudios = useCallback(
    async (sources: AudioSourceType[]) => {
      if (!sources.length) {
        return;
      }

      // http 요청으로 오디오 blob 파일들 가져오기
      const blobs = await getAudioBlobs(sources);

      // blob를 오디오 객체로 변환
      const audios = blobs.map(({ id, blob }) => {
        const audio = new Audio(URL.createObjectURL(blob));
        audio.accessKey = String(id);
        return { id, audio };
      });

      // 오디오 초기 볼륨 설정
      if (audios.length > 0 && audioList.length === 0) {
        audios.forEach(({ audio }) => {
          audio.volume = INITIAL_AUDIO_VOLUME / 10;
        });
      }

      // audioList 상태에 저장
      setAudioList([...audios]);
    },
    [setAudioList],
  );

  // 오디오 추가
  const addAudio = (audio: HTMLAudioElement) => {
    setAudioList([...audioList, { id: "new", audio }]);
  };

  // id로 오디오 삭제
  const removeAudio = (audioId: AudioType["id"]) => {
    const audios = audioList.filter(({ id }) => id !== audioId);
    setAudioList([...audios]);
  };

  // 오디오 초기화
  const resetAudio = () => {
    setIsAudioPlaying(false);
    audioList.forEach(({ audio }) => {
      audio.currentTime = 0;
    });
  };

  // 0 ~ 10 까지의 수를 0.0 ~ 1.0 사이로 변환해서 volumne 값으로 설정
  const chanegeAudioVolume = (value: number) => {
    audioList.forEach(({ audio }) => {
      audio.volume = value / 10;
    });
  };

  // 오디오 현재 재생 시간 변경 (최소 0.1초 주기로 실행되도록 쓰로틀 적용)
  const changeAudioTime = useCallback(
    throttle((value: number) => {
      audioList.forEach(({ audio }) => {
        audio.currentTime = value;
      });
    }, 100),
    [audioList],
  );

  // isAudioPlaying 상태에 따라 오디오 재생/멈춤
  useEffect(() => {
    if (isAudioPlaying) {
      audioList.forEach(({ audio }) => audio.play());
    } else {
      audioList.forEach(({ audio }) => audio.pause());
    }

    return () => {
      audioList.forEach(({ audio }) => audio.pause());
    };
  }, [isAudioPlaying]);

  // 언마운트 시 오디오 리스트, 재생 상태 초기화
  useEffect(() => {
    return () => {
      setIsAudioPlaying(false);
      setAudioList([]);
    };
  }, []);

  return {
    audioList,
    setAudios,
    addAudio,
    removeAudio,
    playAudio: () => setIsAudioPlaying(true),
    stopAudio: () => setIsAudioPlaying(false),
    toggleAudio: () => setIsAudioPlaying((prev) => !prev),
    resetAudio,
    changeAudioTime,
    isAudioPlaying,
    chanegeAudioVolume,
  };
};

export default useAudios;

const getAudioBlobs = async (sources: AudioSourceType[]) => {
  // 개발 서버에서는 proxy 서버를 통해 요청하기 위해 track url 도메인 제거
  const newSources = sources.map((prev) => ({
    ...prev,
    source:
      process.env.NODE_ENV === "development"
        ? prev.source.replace(process.env.REACT_APP_TRACK_API || "", "")
        : prev.source,
  }));
  const promises = newSources.map(({ id, source: uri }) =>
    TRACK_API.get<Blob>(uri, { responseType: "blob" }).then((res) => ({ id, blob: res.data })),
  );
  return Promise.all(promises);
};

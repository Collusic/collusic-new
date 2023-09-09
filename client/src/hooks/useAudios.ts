import { useEffect, useState } from "react";
import axios, { Axios, AxiosResponse } from "axios";
import { useRecoilState } from "recoil";

import { TRACK_API } from "api/axios";
import type { AudioType, AudioSourceType } from "types/audioType";

import useTime from "./useTime";
import { audioListState, isPlayingState } from "../model/audioModel";

const useAudios = () => {
  // const [audioList, setAudioList] = useState<AudioType[]>([]);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [audioList, setAudioList] = useRecoilState<AudioType[]>(audioListState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentTime, setCurrentTime] = useTime();

  const setAudios = (sources: AudioSourceType[]) => {
    if (!sources.length) {
      return;
    }

    const getAudioBlob = async () => {
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

    getAudioBlob().then(async (blobs) => {
      const audios = blobs.map(({ id, blob }) => {
        const audio = new Audio(URL.createObjectURL(blob));
        audio.accessKey = String(id);
        return { id, audio };
      });

      // 가장 첫 번째 audio를 기준으로 재생시간 설정
      if (audios.length > 0 && audioList.length === 0) {
        audios[0].audio.addEventListener("timeupdate", () => {
          setCurrentTime(Number(audios[0].audio.currentTime));
        });
      }

      setAudioList([...audios]);
    });
  };

  const addAudio = (audio: HTMLAudioElement) => {
    setAudioList([...audioList, { id: "new", audio }]);
  };

  const removeAudio = (audioId: AudioType["id"]) => {
    const audios = audioList.filter(({ id }) => id !== audioId);
    setAudioList([...audios]);
  };

  // 0 ~ 10 까지의 수를 0.0 ~ 1.0 사이로 변환해서 volumne 값으로 설정
  const onVolumeChange = (value: number) => {
    audioList.forEach(({ audio }) => {
      // eslint-disable-next-line no-param-reassign
      audio.volume = value / 10;
    });
  };

  useEffect(() => {
    if (currentTime >= 30) {
      setIsPlaying(false);
      return;
    }

    if (!isPlaying) {
      audioList.forEach(({ audio }) => {
        // eslint-disable-next-line no-param-reassign
        audio.currentTime = currentTime;
      });
    }
  }, [currentTime]);

  useEffect(() => {
    if (isPlaying) {
      audioList.forEach(({ audio }) => audio.play());
    } else {
      audioList.forEach(({ audio }) => audio.pause());
    }
  }, [isPlaying]);

  return {
    audioList,
    setAudios,
    addAudio,
    removeAudio,
    time: currentTime,
    setTime: (value: number) => setCurrentTime(value),
    isPlaying,
    toggle: () => setIsPlaying((prev) => !prev),
    onVolumeChange,
  };
};

export default useAudios;

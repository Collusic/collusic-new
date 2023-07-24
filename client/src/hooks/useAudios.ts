import { TRACK_API } from "api/axios";
import { useEffect, useState } from "react";
import useTime from "./useTime";

const useAudios = () => {
  const [audioList, setAudioList] = useState<Array<HTMLAudioElement>>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useTime();

  const setAudios = (sources: string[]) => {
    if (!sources.length) {
      return;
    }

    const getAudioBlob = async () => {
      // 개발 서버에서는 proxy 서버를 통해 요청하기 위해 track url 도메인 제거
      const urlList = sources.map((url) =>
        process.env.NODE_ENV === "development" ? url.replace(process.env.REACT_APP_TRACK_API || "", "") : url,
      );
      const promises = urlList.map((uri) => TRACK_API.get<Blob>(uri, { responseType: "blob" }).then((res) => res.data));
      const blobs = await Promise.all(promises);
      return blobs;
    };

    getAudioBlob().then(async (blobs) => {
      const audios = blobs.map((blob) => new Audio(URL.createObjectURL(blob)));

      // 가장 첫 번째 audio를 기준으로 재생시간 설정
      if (audios.length > 0 && audioList.length === 0) {
        audios[0].addEventListener("timeupdate", () => {
          setCurrentTime(Number(audios[0].currentTime));
        });
      }

      setAudioList([...audios]);
    });
  };

  const addAudio = (blob: Blob) => {
    setAudioList([...audioList, new Audio(URL.createObjectURL(blob))]);
  };

  // 0 ~ 10 까지의 수를 0.0 ~ 1.0 사이로 변환해서 volumne 값으로 설정
  const onVolumeChange = (value: number) => {
    audioList.forEach((audio) => {
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
      audioList.forEach((audio) => {
        // eslint-disable-next-line no-param-reassign
        audio.currentTime = currentTime;
      });
    }
  }, [currentTime]);

  useEffect(() => {
    if (isPlaying) {
      audioList.forEach((audio) => audio.play());
    } else {
      audioList.forEach((audio) => audio.pause());
    }
  }, [isPlaying]);

  return {
    audioList,
    setAudios,
    addAudio,
    time: currentTime,
    setTime: (value: number) => setCurrentTime(value),
    isPlaying,
    toggle: () => setIsPlaying((prev) => !prev),
    onVolumeChange,
  };
};

export default useAudios;

import React from "react";
import { useState, useEffect, useRef } from "react";

import { Play } from "../PlayButton";
import { Pause } from "../PauseButton";
import { Bar } from "../Bar";
import "./style.scss";

type AudioProps = {
  src: string;
};

const Audio: React.FC<AudioProps> = ({ src }) => {
  const [duration, setDuration] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState<number | null>(null);
  const audioRef = useRef<HTMLMediaElement>(null);
  const audio = audioRef.current!;

  const setAudioData = () => {
    setDuration(audioRef.current!.duration);
    setCurTime(audioRef.current!.currentTime);
  };

  const setAudioTime = () => setCurTime(audioRef.current!.currentTime);

  useEffect(() => {
    playing ? audioRef.current!.play() : audioRef.current!.pause();

    if (clickedTime && clickedTime !== curTime) {
      audioRef.current!.currentTime = clickedTime;
      setClickedTime(null);
    }
  });

  const onLoadHandler = () => {
    // React state listeners: update DOM on React state changes
    playing ? audioRef.current!.play() : audioRef.current!.pause();

    if (clickedTime && clickedTime !== curTime) {
      audioRef.current!.currentTime = clickedTime;
      setClickedTime(null);
    }
  };

  // const { curTime, duration, playing, setPlaying, setClickedTime, audioRef } =
  //   AudioPlayer();
  return (
    <div className="player">
      <audio ref={audioRef} className="audio" onLoadedData={setAudioData} onTimeUpdate={setAudioTime}>
        <source src={src} />
        Your browser does not support the <code>audio</code> element.
      </audio>

      <div className="controls">
        {playing ? <Pause handleClick={() => setPlaying(false)} /> : <Play handleClick={() => setPlaying(true)} />}
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)} />
      </div>
    </div>
  );
};

export default Audio;

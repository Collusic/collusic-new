import { DragEvent, useEffect, useRef, useState, memo } from "react";
import { Box, Slider, SliderThumb, SliderTrack, VStack, SliderFilledTrack } from "@chakra-ui/react";
import PlayStick from "../PlayStick";
import TopTimeBox from "../TopTimeBox";
import TrackPlayer from "../TrackPlayer";

import "./style.scss";

interface Props {
  bpm: number;
  currentTime: number;
  audioTracks: HTMLAudioElement[];
  setCurrentTime: (prev: number) => void;
  onRecord: () => void;
}

function TrackSpace({ bpm = 0, currentTime, audioTracks, setCurrentTime, onRecord }: Props) {
  return (
    <div id="track-space">
      <TopTimeBox bpm={bpm} />
      <TrackPlayer
        bpm={bpm}
        time={currentTime}
        audioTracks={audioTracks}
        setTime={setCurrentTime}
        onRecord={onRecord}
      />
    </div>
  );
}

export default TrackSpace;

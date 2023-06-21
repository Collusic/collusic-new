import { DragEvent, useEffect, useRef, useState, memo } from "react";
import { Box, Slider, SliderThumb, SliderTrack, VStack, SliderFilledTrack } from "@chakra-ui/react";
import PlayStick from "../PlayStick";
import TopTimeBox from "../TopTimeBox";
import TrackPlayer from "../TrackPlayer";

import "./style.scss";

function TrackSpace({ bpm = 0, currentTime, setCurrentTime }: any) {
  return (
    <div id="track-space">
      <TopTimeBox bpm={bpm} />
      <TrackPlayer bpm={bpm} />
    </div>
  );
}

export default TrackSpace;

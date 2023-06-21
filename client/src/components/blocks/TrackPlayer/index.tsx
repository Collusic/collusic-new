import { Box, Slider, SliderThumb, SliderTrack, VStack, SliderFilledTrack } from "@chakra-ui/react";
import { memo, useEffect, useRef, useState } from "react";
import TrackPlayBox from "components/atoms/TrackPlayBox";
import { TrackRecordBox } from "components/atoms/TrackRecordBox";
import PlayStick from "../PlayStick";

function TrackPlayer({ bpm }: { bpm: number }) {
  const [currentMeasure, setCurrentMeasure] = useState(0);
  const measure = Math.floor(bpm / 2) + 1;

  // TODO: 기능 구현 후 삭제
  useEffect(() => {
    console.log("1초에 몇마디씩? ", measure, " - ", 30 / measure);
    console.log("현재 재생 시간 : ", measure * (30 / measure));
  }, [measure]);

  return (
    <Slider
      w="100%"
      h="calc(100% - 5rem)"
      aria-label="slider-ex-2"
      value={currentMeasure}
      onChange={setCurrentMeasure}
      min={0}
      max={measure}
      focusThumbOnChange={false}
    >
      <SliderTrack w="100%" height="calc(100% - 3rem)" maxH="inherit" minH="inherit" paddingY="5%">
        <VStack
          w="100%"
          height="100%"
          maxH="inherit"
          minH="100%"
          overflowX="hidden"
          overflowY="scroll"
          align="stretch"
          spacing="1rem"
        >
          <TrackRecordBox />
          <TrackPlayBox measure={currentMeasure} setMeasure={setCurrentMeasure} min={0} max={measure} isPlaying />
          <TrackPlayBox measure={currentMeasure} setMeasure={setCurrentMeasure} min={0} max={measure} isRecording />
          <TrackPlayBox measure={currentMeasure} setMeasure={setCurrentMeasure} min={0} max={measure} isFocus />
          <TrackPlayBox measure={currentMeasure} setMeasure={setCurrentMeasure} min={0} max={measure} />
        </VStack>
      </SliderTrack>
      <SliderThumb top="-6px" w="fit-content" h="100%" cursor="pointer" _focus={{ outline: "none" }}>
        <PlayStick />
      </SliderThumb>
    </Slider>
  );
}

export default TrackPlayer;

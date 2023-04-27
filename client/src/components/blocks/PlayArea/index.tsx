import { Box, Slider, SliderThumb, SliderTrack, VStack, SliderFilledTrack } from "@chakra-ui/react";
import { memo, useEffect, useRef, useState } from "react";
import TrackPlayBox from "components/atoms/TrackPlayBox";
import { TrackRecordBox } from "components/atoms/TrackRecordBox";
import PlayStick from "../PlayStick";

function PlayArea({ bpm }: { bpm: number }) {
  const [playBoxValue, setPlayBoxValue] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickCnt = Math.floor(bpm / 2) + 1;

  useEffect(() => {
    if (!scrollRef || !scrollRef.current) return;
    console.log("1초에 몇마디씩? ", playBoxValue, " - ", 30 / stickCnt);
    console.log("현재 재생 시간 : ", playBoxValue * (30 / stickCnt));
  }, [playBoxValue]);

  return (
    <Slider
      w="100%"
      h="calc(100% - 5rem)"
      aria-label="slider-ex-2"
      colorScheme="pink"
      value={playBoxValue}
      onChange={setPlayBoxValue}
      min={0}
      max={stickCnt}
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
          ref={scrollRef}
        >
          <TrackRecordBox />
          {/* <TrackPlayBox value={playBoxValue} setValue={setPlayBoxValue} min={0} max={stickCnt} isPlaying />
          <TrackPlayBox value={playBoxValue} setValue={setPlayBoxValue} min={0} max={stickCnt} isRecording />
          <TrackPlayBox value={playBoxValue} setValue={setPlayBoxValue} min={0} max={stickCnt} isFocus />
          <TrackPlayBox value={playBoxValue} setValue={setPlayBoxValue} min={0} max={stickCnt} /> */}
        </VStack>
      </SliderTrack>
      <SliderThumb top="-6px" w="fit-content" h="100%" cursor="pointer" _focus={{ outline: "none" }}>
        <PlayStick />
      </SliderThumb>
    </Slider>
  );
}

export default memo(PlayArea);

import { Slider, SliderThumb, SliderTrack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TrackPlayBox from "components/atoms/TrackPlayBox";
import { TrackRecordBox } from "components/atoms/TrackRecordBox";

import PlayStick from "../PlayStick";

function TrackPlayer({
  bpm,
  time,
  audioTracks,
  setTime,
  onRecord,
}: {
  bpm: number;
  time: number;
  audioTracks: HTMLAudioElement[];
  setTime: (time: number) => void;
  onRecord: () => void;
}) {
  const [currentMeasure, setCurrentMeasure] = useState(0);
  const measure = Math.floor(bpm / 2) + 1;

  useEffect(() => {
    setTime(Number((currentMeasure * (30 / measure)).toFixed(3)));
  }, [currentMeasure]);

  useEffect(() => {
    setCurrentMeasure(time / (30 / measure));
  }, [time]);

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
          {audioTracks.map((audio) => (
            <TrackPlayBox
              key={audio.accessKey}
              measure={currentMeasure}
              setMeasure={setCurrentMeasure}
              maxMeasure={measure}
              isPlaying
            />
          ))}
          <TrackRecordBox onRecord={onRecord} />
        </VStack>
      </SliderTrack>
      <SliderThumb top="-6px" w="fit-content" h="100%" cursor="pointer" _focus={{ outline: "none" }}>
        <PlayStick />
      </SliderThumb>
    </Slider>
  );
}

export default TrackPlayer;

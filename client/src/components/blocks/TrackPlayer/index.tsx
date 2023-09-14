import { useEffect, useState } from "react";
import { Slider, SliderThumb, SliderTrack, VStack } from "@chakra-ui/react";

import { AudioType } from "types/audioType";

import PlayStick from "components/blocks/PlayStick";
import TrackPlayBox from "components/atoms/TrackPlayBox";
import TrackRecordBox from "components/atoms/TrackRecordBox";
import useAudios from "hooks/useAudios";

function TrackPlayer({
  bpm,
  isRecording,
  isRecordSuccess,
  onRecord,
  onTrackRemove,
}: {
  bpm: number;
  isRecording?: boolean;
  isRecordSuccess?: boolean;
  onRecord?: () => void;
  onTrackRemove?: (audioId: AudioType["id"]) => void;
}) {
  const { time: currentTime, setTime: setCurrentTime, audioList: audioTracks } = useAudios();
  const [currentMeasure, setCurrentMeasure] = useState(0);
  const totalMeasure = Math.floor(bpm / 2) + 1;

  const handlePlayerChange = (nextMeasure: number) => {
    setCurrentMeasure(nextMeasure);
    setCurrentTime(Number((nextMeasure * (30 / totalMeasure)).toFixed(3)));
  };

  useEffect(() => {
    setCurrentMeasure(currentTime / (30 / totalMeasure));
  }, [currentTime]);

  return (
    <Slider
      w="100%"
      h="calc(100% - 5rem)"
      aria-label="track-player"
      value={currentMeasure}
      onChange={handlePlayerChange}
      min={0}
      max={totalMeasure}
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
          {audioTracks.map(({ id, audio }) => (
            <TrackPlayBox
              key={audio.accessKey}
              id={id}
              measure={currentMeasure}
              maxMeasure={totalMeasure}
              onRemoveButtonClick={onTrackRemove}
              isPlaying
            />
          ))}
          {!isRecordSuccess && !isRecording && onRecord && <TrackRecordBox onRecord={onRecord} />}
          {isRecording && (
            <TrackPlayBox
              id="new"
              measure={currentMeasure}
              maxMeasure={totalMeasure}
              onRemoveButtonClick={onTrackRemove}
              isRecording
            />
          )}
        </VStack>
      </SliderTrack>
      <SliderThumb top="-6px" w="fit-content" h="100%" cursor="pointer" _focus={{ outline: "none" }}>
        <PlayStick />
      </SliderThumb>
    </Slider>
  );
}

TrackPlayer.defaultProps = {
  isRecording: false,
  isRecordSuccess: false,
  onRecord: undefined,
  onTrackRemove: undefined,
};

export default TrackPlayer;

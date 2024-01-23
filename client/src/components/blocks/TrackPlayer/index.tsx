import { Slider, SliderThumb, SliderTrack, VStack } from "@chakra-ui/react";

import { AudioType } from "types/audioType";

import PlayStick from "components/blocks/PlayStick";
import TrackPlayBox from "components/atoms/TrackPlayBox";
import TrackRecordBox from "components/atoms/TrackRecordBox";

import useTrackPlayer from "hooks/useTrackPlayer";
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
  const { audioList: audioTracks } = useAudios();
  const { measure: currentMeasure, setMeasure: setCurrentMeasure, totalMeasure } = useTrackPlayer({ bpm, isRecording });

  const handlePlayerChange = (nextMeasure: number) => {
    setCurrentMeasure(nextMeasure);
  };

  return (
    <Slider
      w="100%"
      h="calc(100% - 5rem)"
      aria-label="track-player"
      value={currentMeasure}
      onChange={handlePlayerChange}
      min={0}
      max={totalMeasure}
      step={0.5}
      focusThumbOnChange={false}
      isReadOnly={isRecording}
      cursor="pointer"
    >
      <SliderThumb top="-6px" w="fit-content" h="100%" cursor="pointer" _focus={{ outline: "none" }}>
        <PlayStick />
      </SliderThumb>
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

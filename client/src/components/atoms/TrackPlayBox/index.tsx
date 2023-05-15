import { Box, Button, Slider, SliderFilledTrack, SliderProps, SliderTrack, Text } from "@chakra-ui/react";
import { memo, useState } from "react";

interface Props extends SliderProps {
  measure: number;
  setMeasure: (value: number) => void;
  isFocus?: boolean;
  isPlaying?: boolean;
  isRecording?: boolean;
}

export default function TrackPlayBox({
  isPlaying = false,
  isRecording = false,
  isFocus = false,
  measure,
  setMeasure,
  ...props
}: Props) {
  const bgColor = isPlaying ? "#B1FF00" : isRecording ? "#fff" : "transparent";
  const borderColor = isFocus ? "solid #B1FF00 0.5px" : undefined;
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    isRecording && setHover(true);
  };

  const handleMouseLeave = () => {
    isRecording && setHover(false);
  };

  return (
    <Slider
      w="calc(100% - 1px)"
      minH="120px"
      // value={value}
      // defaultValue={value}
      // onChange={setValue}
      border={borderColor}
      borderRadius="0.8rem"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      isDisabled
      {...props}
    >
      <SliderTrack width="100%" minH="inherit" borderRadius="inherit" bgColor="rgba(177, 255, 0, 0.1)">
        <SliderFilledTrack minH="inherit" bgColor={bgColor} borderLeftRadius="inherit" />
      </SliderTrack>

      {isRecording && (
        <Button
          as={Box}
          pos="absolute"
          top="0.8rem"
          right="0.8rem"
          padding="0.1rem 0.5rem 0.1rem 0.2rem"
          borderRadius="0.2rem"
          leftIcon={<img src="../../assets/trash/trash.svg" width="16" height="16" alt="trash" />}
          fontSize="0.8rem"
          iconSpacing="2px"
          cursor="pointer"
          backgroundColor="rgb(64, 64, 64, 0.8)"
          visibility={hover ? "visible" : "hidden"}
        >
          <Text margin="0" fontSize="0.5rem" letterSpacing="0.01rem">
            삭제
          </Text>
        </Button>
      )}
    </Slider>
  );
}

TrackPlayBox.defaultProps = {
  isRecording: false,
  isFocus: false,
  isPlaying: false,
};

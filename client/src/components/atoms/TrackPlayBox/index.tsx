import { Box, Button, Slider, SliderFilledTrack, SliderProps, SliderTrack } from "@chakra-ui/react";
import { useState } from "react";

interface Props extends SliderProps {
  value: number;
  setValue: (value: number) => void;
  isFocus?: boolean;
  isPlaying?: boolean;
  isRecording?: boolean;
}

export default function TrackPlayBox({
  isPlaying = false,
  isRecording = false,
  isFocus = false,
  value,
  setValue,
  ...props
}: Props) {
  // eslint-disable-next-line no-nested-ternary
  const bgColor = isPlaying ? "#B1FF00" : isRecording ? "#fff" : "transparent";
  const borderColor = isFocus ? "solid #B1FF00 0.5px" : undefined;
  const [hover, setHover] = useState(false);

  return (
    <Slider
      w="calc(100% - 1px)"
      minH="70px"
      // value={value}
      // defaultValue={value}
      border={borderColor}
      borderRadius="10px"
      // onChange={setValue}
      isDisabled
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <SliderTrack
        width="100%"
        minH="inherit"
        borderRadius="inherit"
        bgColor="rgba(177, 255, 0, 0.1)"
        onClick={() => {
          console.log("slider");
        }}
      >
        <SliderFilledTrack minH="inherit" bgColor={bgColor} borderLeftRadius="inherit" />
      </SliderTrack>

      {isRecording && hover && (
        <Button
          as={Box}
          pos="absolute"
          top="0.4rem"
          right="0.8rem"
          leftIcon={<img src="../../assets/trash/trash.svg" width="16" height="16" alt="trash" />}
          fontSize="0.8rem"
          iconSpacing="2px"
          cursor="pointer"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          삭제
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

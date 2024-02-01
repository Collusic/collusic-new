import { useState } from "react";
import { Box, Button, Slider, SliderFilledTrack, SliderTrack, Text } from "@chakra-ui/react";

import { AudioType } from "types/audioType";
import { Track } from "types/projectType";
import { NEW_TRACK_ID } from "constants/key";
import { SelectedTrackSrc } from "utils/data/track";

import "./style.scss";

type TrackInfoType = { nickname: string; profileImageUrl: string; trackTag: Track };

interface Props {
  id: AudioType["id"];
  measure: number;
  maxMeasure: number;
  trackInfo?: TrackInfoType;
  isFocus?: boolean;
  isPlaying?: boolean;
  isRecording?: boolean;
  onRemoveButtonClick?: (id: AudioType["id"]) => void;
}

export default function TrackPlayBox({
  id,
  trackInfo,
  isPlaying = false,
  isRecording = false,
  isFocus = false,
  measure,
  maxMeasure,
  onRemoveButtonClick,
}: Props) {
  const bgColor = isPlaying ? "#B1FF00" : isRecording ? "#fff" : "transparent";
  const borderColor = isFocus ? "solid #B1FF00 0.5px" : undefined;
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleRemoveButtonClick = () => {
    onRemoveButtonClick && onRemoveButtonClick(id);
  };

  return (
    <div className="flex-col-10">
      {trackInfo && <TrackInfo {...trackInfo} />}
      <Slider
        w="calc(100% - 1px)"
        minH="6rem"
        value={measure}
        border={borderColor}
        borderRadius="0.8rem"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        isDisabled
        min={0}
        max={maxMeasure}
        cursor="initial"
      >
        <SliderTrack width="100%" minH="inherit" borderRadius="inherit" bgColor="rgba(177, 255, 0, 0.1)">
          <SliderFilledTrack minH="inherit" bgColor={bgColor} borderLeftRadius="inherit" />
        </SliderTrack>

        {(isRecording || id === NEW_TRACK_ID) && (
          <Button
            as={Box}
            pos="absolute"
            top="0.8rem"
            right="0.8rem"
            padding="0.1rem 0.5rem 0.1rem 0.2rem"
            borderRadius="0.2rem"
            leftIcon={<img src="/assets/trash/trash.svg" width="16" height="16" alt="trash" />}
            fontSize="0.8rem"
            iconSpacing="2px"
            cursor="pointer"
            backgroundColor="rgb(64, 64, 64, 0.8)"
            visibility={hover ? "visible" : "hidden"}
            onClick={handleRemoveButtonClick}
          >
            <Text margin="0" fontSize="0.5rem" letterSpacing="0.01rem">
              삭제
            </Text>
          </Button>
        )}
      </Slider>
    </div>
  );
}

TrackPlayBox.defaultProps = {
  trackInfo: undefined,
  isRecording: false,
  isFocus: false,
  isPlaying: false,
  onRemoveButtonClick: () => {},
};

function TrackInfo({ nickname, profileImageUrl, trackTag }: TrackInfoType) {
  return (
    <div className="flex-row-8">
      <img id="profile" src={profileImageUrl ?? "/assets/signin/default_profile.png"} alt="profile" />
      <span id="nickname">{nickname}</span>
      <div id="divider" />
      <div id="tag" className="flex-row-4">
        <img src={SelectedTrackSrc[trackTag]} alt="tag" />
        <span>{trackTag}</span>
      </div>
    </div>
  );
}

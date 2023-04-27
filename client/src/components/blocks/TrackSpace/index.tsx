import { DragEvent, useEffect, useRef, useState, memo } from "react";
import { Box, Slider, SliderThumb, SliderTrack, VStack, SliderFilledTrack } from "@chakra-ui/react";
import PlayStick from "../PlayStick";
import TopTimeBox from "../TopTimeBox";
import PlayArea from "../PlayArea";

import "./style.scss";

function TrackSpace({ bpm = 0, currentTime, setCurrentTime }: any) {
  const trackSpaceRef = useRef<HTMLInputElement>(null);
  const playStickRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState(false);
  const [handleOffset, setHandleOffset] = useState(currentTime);

  const mouseUpHandler = () => {
    setDrag(false);
  };
  const mouseDownHandler = () => {
    setDrag(true);
  };
  const mouseLeaveHandler = () => {
    setDrag(false);
  };
  const dragHandler = (e: DragEvent) => {
    if (!drag) return;
    if (e.pageX <= 0) return;
    const PADDING_LEFT = 80;
    const HALF_OF_HANDLE_WIDTH = 6;
    setHandleOffset(
      e.pageX - (trackSpaceRef.current as HTMLDivElement).offsetLeft - HALF_OF_HANDLE_WIDTH - PADDING_LEFT,
    );
  };
  const dragStartHandler = (e: DragEvent) => {
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  useEffect(() => {
    if (!trackSpaceRef.current) return;
    setCurrentTime(((handleOffset * 30) / (trackSpaceRef.current as HTMLDivElement).offsetWidth) * 100);
    // 재생 막대 바 드래그 범위를 TrackSpace 내부로 제한
    if (handleOffset <= 0 || handleOffset >= (trackSpaceRef.current as HTMLDivElement).offsetWidth - 6 * 16) {
      setDrag(false);
    }
  }, [handleOffset]);

  useEffect(() => {
    console.log(currentTime);
  }, [currentTime]);

  return (
    <div
      id="track-space"
      // draggable="true"
      // onMouseUp={mouseUpHandler}
      // onMouseDown={mouseDownHandler}
      // onMouseLeave={mouseLeaveHandler}
      // onDrag={dragHandler}
      // onDragStart={dragStartHandler}
      // ref={trackSpaceRef}
    >
      <TopTimeBox bpm={bpm} />
      <PlayArea bpm={bpm} />
    </div>
  );
}

export default memo(TrackSpace);

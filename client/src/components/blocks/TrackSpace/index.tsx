import { DragEvent, useEffect, useRef, useState } from "react";
import PlayStick from "../PlayStick";
import "./style.scss";
import TopTimeBox from "../TopTimeBox";

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
    setCurrentTime(((handleOffset * 30) / (trackSpaceRef.current as HTMLDivElement).offsetWidth) * 100);
    // 재생 막대 바 드래그 범위를 TrackSpace 내부로 제한
    if (handleOffset <= 0 || handleOffset >= (trackSpaceRef.current as HTMLDivElement).offsetWidth - 6 * 16) {
      setDrag(false);
    }
  }, [handleOffset]);

  return (
    <div
      id="track-space"
      draggable="true"
      onMouseUp={mouseUpHandler}
      onMouseDown={mouseDownHandler}
      onMouseLeave={mouseLeaveHandler}
      onDrag={dragHandler}
      onDragStart={dragStartHandler}
      ref={trackSpaceRef}
    >
      <TopTimeBox bpm={bpm} />
      <PlayStick currentOffset={handleOffset} currentRef={playStickRef} />
    </div>
  );
}

export default TrackSpace;

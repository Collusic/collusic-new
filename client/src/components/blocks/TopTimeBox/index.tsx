import { useRef } from "react";
import TopTimeBar from "components/atoms/TopTimeBar";
import "./style.scss";

function TopTimeBox({ bpm = 0 }) {
  const topTimeBoxRef = useRef<HTMLDivElement>(null);
  const stickCnt = Math.floor(bpm / 2) + 1;

  const gapBetweenBars = (isLast = false) => {
    const WIDTH_OF_TIME_BAR = 4;
    const PADDING_LEFT = 4;
    const WIDTH_OF_PLAY_STICK = 12;
    if (!topTimeBoxRef.current) return 0;
    const timeBoxWidth =
      (document.querySelector("#track-space") as HTMLDivElement).offsetWidth -
      parseFloat(getComputedStyle(document.querySelector("#track-space") as HTMLDivElement).paddingLeft) -
      PADDING_LEFT -
      WIDTH_OF_PLAY_STICK;

    if (bpm % 2 === 1 && isLast) {
      return parseFloat((timeBoxWidth / (stickCnt - 1) / 2 - WIDTH_OF_TIME_BAR).toFixed(2));
    }
    return parseFloat((timeBoxWidth / (stickCnt - 1) - WIDTH_OF_TIME_BAR).toFixed(2));
  };

  return (
    <div id="top-time-box" ref={topTimeBoxRef}>
      {Array.from({ length: stickCnt }, (value, idx) => {
        if (idx % 4 === 0)
          return (
            <TopTimeBar key={idx} barType="big" barNumber={String(idx)} gap={gapBetweenBars(idx === stickCnt - 1)} />
          );
        return <TopTimeBar key={idx} barType="small" gap={gapBetweenBars(idx === stickCnt - 1)} />;
      })}
    </div>
  );
}

export default TopTimeBox;

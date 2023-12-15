import { useEffect, useState } from "react";
import TopTimeBar from "components/atoms/TopTimeBar";
import "./style.scss";

function TopTimeBox({ bpm = 30 }) {
  const [stickCnt, setStickCnt] = useState(bpm);
  const [timeBoxSize, setTimeBoxSize] = useState(
    (document.querySelector("#track-space") as HTMLDivElement)?.offsetWidth,
  );

  const gapBetweenBars = (isLast = false) => {
    console.log("between");
    const WIDTH_OF_TIME_BAR = 4;
    const PADDING_LEFT = 4;
    const WIDTH_OF_PLAY_STICK = 12;

    const trackSpaceDOM = document.querySelector("#track-space");
    if (!trackSpaceDOM) return 0;
    const timeBoxWidth =
      (trackSpaceDOM as HTMLDivElement).offsetWidth -
      parseFloat(getComputedStyle(document.querySelector("#track-space") as HTMLDivElement).paddingLeft) -
      PADDING_LEFT -
      WIDTH_OF_PLAY_STICK;

    if (bpm % 2 === 1 && isLast) {
      return parseFloat((timeBoxWidth / (stickCnt - 1) / 2 - WIDTH_OF_TIME_BAR).toFixed(2));
    }
    return parseFloat((timeBoxWidth / (stickCnt - 1) - WIDTH_OF_TIME_BAR).toFixed(2));
  };

  // 브라우저 크기가 변경될 경우, 상단 막대 간격 조정
  useEffect(() => {
    window.addEventListener("resize", () =>
      setTimeBoxSize((document.querySelector("#track-space") as HTMLDivElement)?.offsetWidth),
    );
    return () => {
      window.removeEventListener("resize", () =>
        setTimeBoxSize((document.querySelector("#track-space") as HTMLDivElement)?.offsetWidth),
      );
    };
  }, []);
  // bpm이 변경될 경우, 상단 막대 간격 조정
  useEffect(() => {
    setStickCnt(Math.floor(bpm / 2) + 1);
  }, [bpm, timeBoxSize]);

  return (
    <div id="top-time-box">
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

import moment from "moment";
import React from "react";
import "moment-duration-format";
import "../utils/style/audio.scss";

type BarProps = {
  duration: number; // 미디어 파일 총 길이
  curTime: number; // 시간 위치
  onTimeUpdate(num: number): void;
};

export const Bar: React.FC<BarProps> = ({
  duration,
  curTime,
  onTimeUpdate,
}) => {
  const curPercentage = (curTime / duration) * 100;

  const formatDuration = (duration: moment.DurationInputArg1) => {
    let time = moment.duration(duration, "seconds").format("mm:ss");
    if (time.length !== 5) {
      return "00:" + time;
    } else {
      return time;
    }
  };

  function calcClickedTime(e: MouseEvent | React.MouseEvent<HTMLDivElement>) {
    const clickPositionInPage = e.pageX;
    const bar = e.currentTarget as HTMLDivElement;
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e: React.MouseEvent<HTMLDivElement>) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = (eMove: MouseEvent) => {
      onTimeUpdate(calcClickedTime(eMove));
    };
    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

  return (
    <div className="bar">
      <div
        className="bar__progress"
        style={{
          background: `linear-gradient(to right, orange ${curPercentage}%, #f1f1f1 0)`,
        }}
        onMouseDown={(e) => {
          // onTimeUpdate(calcClickedTime(e));
          // console.log("down");
          // console.dir(e.currentTarget);

          // e.currentTarget.addEventListener("mousemove", updateTimeOnMove);
          // e.currentTarget.addEventListener("mouseup", (e ) => {
          //   console.log(e.currentTarget);
          //   e.currentTarget.removeEventListener("mousemove", updateTimeOnMove);
          // });
          onTimeUpdate(calcClickedTime(e));

          const updateTimeOnMove = (eMove: MouseEvent) => {
            onTimeUpdate(calcClickedTime(eMove));
          };

          const removeListener = (eMove: MouseEvent) => {
            document.removeEventListener("mousemove", updateTimeOnMove);
          };
          document.addEventListener("mousemove", updateTimeOnMove);
          document.addEventListener("mouseup", removeListener);
        }}
        // onMouseUp={(e) => {
        //   console.log("up");

        //   console.dir(e.currentTarget);
        //   e.currentTarget.removeEventListener("mousemove", updateTimeOnMove);
        // }}
      >
        {/* <span
          className="bar__progress__knob"
          style={{ left: `${curPercentage - 2}%` }}
        /> */}
      </div>
      <span className="bar__time">{formatDuration(curTime)}</span>
    </div>
  );
};

import { useEffect } from "react";

import useTimer from "hooks/useTimer";
import RecordButton from "components/atoms/RecordButton";

import "./style.scss";

export function TrackRecordBox({ onRecord }: { onRecord: () => void }) {
  const { time: count, didStart, isExpired, start: startTimer } = useTimer(3);

  const handleRecordButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    startTimer();
  };

  const startRecord = () => {
    onRecord();
  };

  const stopEventPropagation: EventListener = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (isExpired) {
      startRecord();
    }
  }, [isExpired]);

  useEffect(() => {
    const $recordBox = document.querySelector("#record-box");
    $recordBox?.addEventListener("pointerdown", stopEventPropagation);
    return () => {
      $recordBox?.removeEventListener("pointerdown", stopEventPropagation);
    };
  });

  return !isExpired ? (
    <div id="record-box">
      <RecordButton isTimerStart={didStart} timerCount={count} onClick={handleRecordButtonClick} />
      <input type="hidden" />
    </div>
  ) : null;
}

export default TrackRecordBox;

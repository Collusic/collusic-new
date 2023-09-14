import { useEffect } from "react";
import RecordButton from "../RecordButton";

import "./style.scss";

export function TrackRecordBox({ onRecord }: { onRecord: () => void }) {
  const handleRecordButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {};

  const startRecord = () => {
    onRecord();
  };

  const stopEventPropagation: EventListener = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const $recordBox = document.querySelector("#record-box");
    $recordBox?.addEventListener("pointerdown", stopEventPropagation);
    return () => {
      $recordBox?.removeEventListener("pointerdown", stopEventPropagation);
    };
  });

  return (
    <div id="record-box">
      <RecordButton handleBtnClickEvent={handleRecordButtonClick} onEndTimer={startRecord} />
      <input type="hidden" />
    </div>
  );
}

export default TrackRecordBox;

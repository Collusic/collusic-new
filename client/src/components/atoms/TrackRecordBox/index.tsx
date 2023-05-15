import { useCallback, useEffect } from "react";
import RecordButton from "../RecordButton";
import "./style.scss";

export function TrackRecordBox() {
  const handleRecordButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {};

  const startRecord = () => {};

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

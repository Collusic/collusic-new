import RecordButton from "../RecordButton";
import "./style.scss";

export function TrackRecordBox() {
  return (
    <div id="record-box">
      <RecordButton
        handleBtnClickEvent={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
}

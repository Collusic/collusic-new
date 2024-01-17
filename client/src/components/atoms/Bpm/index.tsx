import "./style.scss";

function Bpm({ bpmState }: { bpmState: number }) {
  return (
    <div id="bpm">
      <span>BPM | {bpmState}</span>
    </div>
  );
}

export default Bpm;

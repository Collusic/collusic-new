import "./style.scss";

function PlayStick({ currentOffset, currentRef }: any) {
  return (
    // <div id="play-stick" ref={currentRef} style={{ left: currentOffset }}>
    <div id="play-stick">
      <div id="handle" />
      <div id="stick" />
    </div>
  );
}

export default PlayStick;

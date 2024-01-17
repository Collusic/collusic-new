import "./style.scss";

function TrackCount({ trackCount }: { trackCount: number }) {
  return (
    <div id="track-count">
      <img src={`${process.env.PUBLIC_URL}/assets/trackCount/trackCount.png`} alt="" />
      <span>{trackCount}</span>
    </div>
  );
}

export default TrackCount;

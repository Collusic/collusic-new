import "./style.scss";

function TopTimeBar({ barType = "small", barNumber = "", gap = 0 }) {
  return (
    <div className="top-time-bar" style={{ paddingRight: gap }}>
      <div className="bar-number">{barNumber}</div>
      <div className={barType} />
    </div>
  );
}

export default TopTimeBar;

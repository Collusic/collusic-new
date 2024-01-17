import "./style.scss";

type LoginButtonProps = {
  innerText: string;
  backgroundColor: string;
  textColor: string;
  src: string;
  onBtnClick(): void;
};

export function LoginButton({ innerText, backgroundColor, textColor, src, onBtnClick }: LoginButtonProps) {
  return (
    <button
      type="button"
      className="login-button"
      style={{ backgroundColor: `${backgroundColor}`, color: `${textColor}` }}
      onClick={onBtnClick}
    >
      <img src={src} alt="logo" />
      <p>{innerText}</p>
    </button>
  );
}

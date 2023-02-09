import { MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";

import "./style.scss";

type ColorType = "green" | "white" | "text" | "line";

interface ButtonProps {
  type: ColorType;
  isSelected?: boolean;
  onBtnClick: MouseEventHandler;
  width?: string;
  marginLeft?: string;
  marginTop?: string;
  imgSrc?: string | null;
  children?: ReactNode;
}

const defaultProps = {
  imgSrc: "",
  width: "fit-content",
  marginLeft: "0",
  marginTop: "0",
  isSelected: true,
  children: null,
};

function Button({ type, isSelected, onBtnClick, imgSrc, width, marginLeft, marginTop, children }: ButtonProps) {
  return (
    <button
      id="button"
      type="button"
      className={classNames(type, { selected: isSelected })}
      onClick={onBtnClick}
      style={{
        width,
        marginLeft,
        marginTop,
      }}
    >
      {imgSrc && <img src={imgSrc} alt={children as string} />}
      {children}
    </button>
  );
}

Button.defaultProps = defaultProps;

export default Button;

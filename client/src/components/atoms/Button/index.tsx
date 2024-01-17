import { MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";

import "./style.scss";

type ColorType = "green" | "white" | "text" | "line";

interface ButtonProps {
  type: ColorType;
  isSelected?: boolean;
  onBtnClick: MouseEventHandler;
  width?: string;
  height?: string;
  padding?: string;
  marginLeft?: string;
  marginTop?: string;
  imgSrc?: string | null;
  children?: ReactNode;
}

const defaultProps = {
  imgSrc: "",
  width: "fit-content",
  height: "fit-content",
  padding: "",
  marginLeft: "0",
  marginTop: "0",
  isSelected: true,
  children: null,
};

function Button({
  type,
  isSelected,
  onBtnClick,
  imgSrc,
  width,
  height,
  padding,
  marginLeft,
  marginTop,
  children,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={classNames("button", type, { selected: isSelected })}
      onClick={onBtnClick}
      style={{
        width,
        height,
        ...(padding && { padding }),
        marginLeft,
        marginTop,
      }}
    >
      {imgSrc && <img className="tag-img" src={imgSrc} alt={children as string} />}
      {children}
    </button>
  );
}

Button.defaultProps = defaultProps;

export default Button;

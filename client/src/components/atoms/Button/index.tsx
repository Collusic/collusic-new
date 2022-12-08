import React, { MouseEventHandler, ReactNode } from "react";
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
  svgSrc?: string | null;
  children?: ReactNode;
}

const defaultProps = {
  imgSrc: "",
  width: "fit-content",
  marginLeft: "0",
  marginTop: "0",
  svgSrc: null,
  isSelected: true,
};

function Button({ type, isSelected, onBtnClick, svgSrc, width, marginLeft, marginTop, children }: ButtonProps) {
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
      {svgSrc && <img src={svgSrc} alt={children as string} />}
      {children}
    </button>
  );
}

Button.defaultProps = defaultProps;

export default Button;
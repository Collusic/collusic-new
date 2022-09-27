/* eslint-disable react/jsx-props-no-spreading */
import React, { MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";

import "utils/style/button.scss";

type ColorType = "green" | "white" | "text" | "line";

interface ButtonProps {
  type: ColorType;
  isSelected: boolean;
  clickHandler: MouseEventHandler;
  children: ReactNode;
  width?: string;
  marginLeft?: string;
}

const defaultProps = {
  width: "fit-content",
  marginLeft: "0",
};

function Button({ type, isSelected, clickHandler, children, width, marginLeft }: ButtonProps) {
  return (
    <button
      type="button"
      className={classNames(type, { selected: isSelected })}
      onClick={clickHandler}
      style={{
        width,
        marginLeft,
      }}
    >
      {children}
    </button>
  );
}

Button.defaultProps = defaultProps;

export default Button;

/* eslint-disable react/jsx-props-no-spreading */
import React, { MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";

import "utils/style/button.scss";

type ColorType = "green" | "white" | "text" | "line";

interface ButtonProps {
  type: ColorType;
  isSelected: boolean;
  width: string;
  clickHandler: MouseEventHandler;
  children: ReactNode;
}

function Button({ type, isSelected, width, clickHandler, children }: ButtonProps) {
  return (
    <button
      type="button"
      className={classNames(type, { selected: isSelected })}
      onClick={clickHandler}
      style={{ width }}
    >
      {children}
    </button>
  );
}

export default Button;

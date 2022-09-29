import React, { MouseEventHandler } from "react";
import classNames from "classnames";

import "./style.scss";

type ColorType = "green" | "white" | "text" | "line";

interface ButtonProps {
  type: ColorType;
  isSelected: boolean;
  clickHandler: MouseEventHandler;
}

function Button({ type, isSelected, clickHandler }: ButtonProps) {
  return (
    <button type="button" className={classNames(type, { selected: isSelected })} onClick={clickHandler}>
      BUTTON
    </button>
  );
}

export default Button;

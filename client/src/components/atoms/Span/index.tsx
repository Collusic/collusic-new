import React from "react";

import "./style.scss";

interface SpanProps {
  children: string;
}

function Span({ children }: SpanProps) {
  return <span className="span">{children}</span>;
}

export default Span;

import React from "react";

import "./RequestListPagenation.scss";

type RequestListPagenationProps = {
  pagenationList: number[];
  onClickHandler(e: React.MouseEvent<HTMLButtonElement>): void;
};

export const RequestListPagenationView: React.FC<
  RequestListPagenationProps
> = ({ pagenationList, onClickHandler }) => {
  return (
    <article className="pagenation">
      <section className="left-arrow">{"<"}</section>
      {pagenationList &&
        pagenationList.map((pageNumber, index) => (
          <section
            key={index}
            className="page-number"
            id={`${index}`}
            onClick={onClickHandler}
          >
            {pageNumber}
          </section>
        ))}
      <section className="right-arrow">{">"}</section>
    </article>
  );
};

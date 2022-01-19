import React from "react";

type RequestListPagenationProps = {
  pagenationList: number[];
  // onClickHandler(e: React.MouseEvent<HTMLButtonElement>): void;
};

export const RequestListPagenationView: React.FC<
  RequestListPagenationProps
> = ({ pagenationList }) => {
  return (
    <article className="pagenation">
      <section className="left-arrow">{"<"}</section>
      {pagenationList &&
        pagenationList.map((pageNumber, index) => (
          <section className="page-number" id={`${index}`}>
            {pageNumber}
          </section>
        ))}
      <section className="right-arrow">{">"}</section>
    </article>
  );
};

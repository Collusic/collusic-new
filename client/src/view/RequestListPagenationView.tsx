import React from "react";

import "../utils/style/RequestListPagenation.scss";

type RequestListPagenationProps = {
  pagenationList: number[];
  currentPage: number;
  onClickNumberHandler(e: React.MouseEvent<HTMLButtonElement>): void;
  onClickLeftHandler(e: React.MouseEvent<HTMLButtonElement>): void;
  onClickRightHandler(e: React.MouseEvent<HTMLButtonElement>): void;
};

export const RequestListPagenationView: React.FC<
  RequestListPagenationProps
> = ({
  pagenationList,
  currentPage,
  onClickNumberHandler,
  onClickLeftHandler,
  onClickRightHandler,
}) => {
  return (
    <article className="pagenation">
      <section className="arrow" onClick={onClickLeftHandler}>
        {"<<"}
      </section>
      {pagenationList &&
        pagenationList.map((pageNumber) => (
          <section
            key={pageNumber}
            className={`page-number ${
              pageNumber === currentPage ? "clicked" : ""
            }`}
            id={`${pageNumber}`}
            onClick={onClickNumberHandler}
          >
            {pageNumber}
          </section>
        ))}
      <section className="arrow" onClick={onClickRightHandler}>
        {">>"}
      </section>
    </article>
  );
};

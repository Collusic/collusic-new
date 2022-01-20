import React from "react";

import "./Create.scss";

type CreateFieldProps = {
  fields: string[];
  onClickFieldHandler(e: React.MouseEvent<HTMLDivElement>): void;
};

export const CreateFieldView: React.FC<CreateFieldProps> = ({
  fields,
  onClickFieldHandler,
}) => (
  <section className="box">
    <section className="text">요청 분야</section>
    <section className="button-box">
      {fields.map((field, idx) => (
        <div className="button" onClick={onClickFieldHandler} key={idx}>
          {field}
        </div>
      ))}
    </section>
  </section>
);

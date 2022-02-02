import React from "react";
import type { Field } from "../types/requestProjectType";
import type { CreateProjectType } from "../types/createProjectType";

import "../utils/style/create.scss";

type CreateFieldProps = {
  createType: CreateProjectType;
  fields: Field[];
  onClickFieldHandler(e: React.MouseEvent<HTMLDivElement>): void;
};

export const CreateFieldView: React.FC<CreateFieldProps> = ({
  createType,
  fields,
  onClickFieldHandler,
}) => (
  <section className="box">
    <section className="text">{createType.description} 분야</section>
    <section className="button-box">
      {fields.map((field, idx) => (
        <div className="button" onClick={onClickFieldHandler} key={idx}>
          {field}s
        </div>
      ))}
    </section>
  </section>
);

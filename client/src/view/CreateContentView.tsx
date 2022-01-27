import React from "react";
import { CreateProjectType } from "../types/createProjectType";

import "./CreateContent.scss";

type CreateContentViewProps = CreateProjectType;

export const CreateContentView: React.FC<CreateContentViewProps> = ({
  createType,
}) => {
  return (
    <section className="content-container">
      <h4>{createType.description} 내용</h4>
      <div className="textarea-container">
        <textarea
          name="content"
          placeholder="내용을 입력해 주세요 (최대300자)"
        />
      </div>
    </section>
  );
};

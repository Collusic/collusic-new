import React from "react";
import "./CreateContent.scss";

export const CreateContentView: React.FC = () => {
  return (
    <div className="content-container">
      <h4>요청 내용</h4>
      <div className="textarea-container">
        <textarea
          name="content"
          placeholder="내용을 입력해 주세요 (최대300자)"
        />
      </div>
    </div>
  );
};

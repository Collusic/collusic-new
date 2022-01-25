import React from "react";
import "./CreateLyric.scss";

export const CreateLyricView: React.FC = () => {
  return (
    <div className="lyric-container">
      <h4>가사</h4>
      <div className="textarea-container">
        <textarea name="content" placeholder="가사를 입력해 주세요" />
      </div>
    </div>
  );
};

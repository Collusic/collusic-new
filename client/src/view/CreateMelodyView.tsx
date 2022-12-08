import React from "react";
import "./CreateMelody.scss";

type CreateMelodyProps = {
  onChangeFiles(e: React.ChangeEvent<HTMLInputElement> | any): void;
};

export const CreateMelodyView: React.FC<CreateMelodyProps> = ({
  onChangeFiles,
}) => {
  return (
    <section className="melody-container">
      <h4>멜로디/악기</h4>
      <div className="drag-drop-box">
        <label className="file-name" htmlFor="melody">
          <input
            id="melody"
            name="melody"
            type="file"
            accept="audio/*"
            onChange={onChangeFiles}
          />
          <p>+ mp3 파일을 드래그하여 업로드 해주세요.</p>
        </label>
      </div>
    </section>
  );
};

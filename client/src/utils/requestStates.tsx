import React from "react";
import Audio from "../components/Audio";

export const requestStates = (
  key: number,
  uploadFilePath: string,
  lyrics: string
) => ({
  melody: ((): JSX.Element => <Audio key={key} src={uploadFilePath}></Audio>)(),
  instrument: ((): JSX.Element => (
    <Audio key={key} src={uploadFilePath}></Audio>
  ))(),

  lyric: ((): JSX.Element => <div key={key}>{lyrics}</div>)(),
});

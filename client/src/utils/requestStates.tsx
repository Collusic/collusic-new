import React from "react";
import Audio from "../components/Audio";

export const requestStates = (
  key: number,
  melodySrc: string,
  instrumentSrc: string,
  lyric: string
) => ({
  melody: ((): JSX.Element => {
    console.log(melodySrc);
    return <Audio src={melodySrc}></Audio>;
  })(),

  instrument: ((): JSX.Element => <Audio src={instrumentSrc}></Audio>)(),

  lyric: ((): JSX.Element => <div>{lyric}</div>)(),
});

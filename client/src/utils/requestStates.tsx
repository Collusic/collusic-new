import React from "react";

export const requestStates = (
  key: number,
  melodySrc: string,
  instrumentSrc: string,
  lyric: string
) => ({
  melody: ((): JSX.Element => (
    <audio controls key={key}>
      <source src={melodySrc}></source>이 문장은 audio 요소가 제대로 인식이
      안됐을 때 나타납니다.
    </audio>
  ))(),

  instrument: ((): JSX.Element => (
    <audio controls key={key}>
      <source src={instrumentSrc}></source>이 문장은 audio 요소가 제대로 인식이
      안됐을 때 나타납니다.
    </audio>
  ))(),

  lyric: ((): JSX.Element => <div key={key}>{lyric}</div>)(),
});

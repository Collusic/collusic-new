import React from "react";

export const requestStates = (
  melodySrc: string,
  instrumentSrc: string,
  lyric: string
) => {
  return {
    melody: (): JSX.Element => {
      return <audio src={melodySrc}></audio>;
    },

    instrument: (): JSX.Element => {
      return <audio src={instrumentSrc}></audio>;
    },

    lyric: (): JSX.Element => {
      return <div>{lyric}</div>;
    },
  };
};

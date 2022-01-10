type Field = "Melody" | "Instrument" | "Lyric";

type Genre = "hiphop" | "balad" | "funk";

type Mood = "happy" | "cry" | "powerful";

type requestMelody = {
  src: string;
};

type requestLyric = {
  lyric: string;
};

type RequestProjectType = {
  requestProjectId?: number;
  requestTitle: string;
  requestContent?: string;
  requestField: Array<Field>;
  requestGenre: Array<Genre>;
  requestMood: Array<Mood>;
  upload: requestMelody | requestLyric;
};

export { Field, Genre, Mood, requestLyric, requestMelody, RequestProjectType };

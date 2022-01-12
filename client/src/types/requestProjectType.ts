type Field = "melody" | "instrument" | "lyric";

type Genre = "hiphop" | "balad" | "funk";

type Mood = "happy" | "cry" | "powerful";

type RequestProjectType = {
  requestProjectId?: number;
  requestTitle: string;
  requestContent?: string;
  requestField: Array<Field>;
  requestGenre: Array<Genre>;
  requestMood: Array<Mood>;
  requestLyric?: string;
  requestInstrument?: string;
  requestMelody?: string;
};

export { Field, Genre, Mood, RequestProjectType };

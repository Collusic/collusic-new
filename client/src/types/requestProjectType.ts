type Field = "melody" | "instrument" | "lyric";

type Genre =
  | "Acoustic"
  | "Blues"
  | "Classic"
  | "Country"
  | "Electronic"
  | "Fork"
  | "Funk"
  | "Hiphop"
  | "Indie"
  | "Jazz"
  | "Latin"
  | "Pop"
  | "Reggae"
  | "Retro"
  | "Rock"
  | "Soul"
  | "R&B"
  | "Balad"
  | "Funk";

type Mood =
  | "Uplifting"
  | "Epic"
  | "Powerful"
  | "Happy"
  | "Hopeful"
  | "Love"
  | "Playful"
  | "Groovy"
  | "Sad"
  | "Serious"
  | "Dramatic"
  | "Dark";

type RequestProjectType = {
  requestProjectId: number;
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

import { Field, Genre, Mood } from "../../types/requestProjectType";

const fields: Field[] = ["melody", "instrument", "lyric"];
const genres: Genre[] = [
  "Acoustic",
  "Blues",
  "Classic",
  "Country",
  "Electronic",
  "Fork",
  "Funk",
  "Hiphop",
  "Indie",
  "Jazz",
  "Latin",
  "Pop",
  "Reggae",
  "Retro",
  "Rock",
  "Soul",
  "R&B",
  "Balad",
  "Funk",
];

const moods: Mood[] = [
  "Uplifting",
  "Epic",
  "Powerful",
  "Happy",
  "Hopeful",
  "Love",
  "Playful",
  "Groovy",
  "Sad",
  "Serious",
  "Dramatic",
  "Dark",
];

export { fields, moods, genres };

import React from "react";

type Field = "Melody" | "Instrument" | "Lyric";

type Genre = "hiphop" | "balad" | "funk";

type Mood = "happy" | "cry" | "powerful";

interface MainProps {
  userEmail: string;
  description: string;
  field: Field;
  genre: Genre;
  mood: Mood;
  melodySrc?: string;
  lyricDescription?: string;
}

const MainView: React.FC<MainProps> = ({
  userEmail,
  description,
  field,
  genre,
  mood,
}) => {
  return (
    <React.Fragment>
      <MainList></MainList>
    </React.Fragment>
  );
};

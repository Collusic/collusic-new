export type AudioSourceType = {
  id: number;
  source: string;
};

export type AudioType = {
  id: number | "new";
  audio: HTMLAudioElement;
};

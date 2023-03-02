export const getSliderHandlePosition = (
  min: number,
  max: number,
  value: number,
  sliderWidth: number,
  type: string = "bpm",
) => {
  const BPM_HANDLE_WIDTH = 32;
  const SOUND_HANDLE_WIDTH = 10;
  const percent = (value - min) / (max - min);
  return `${
    (type === "bpm" ? BPM_HANDLE_WIDTH / 2 : SOUND_HANDLE_WIDTH / 2) +
    (sliderWidth - (type === "bpm" ? BPM_HANDLE_WIDTH : SOUND_HANDLE_WIDTH)) * percent
  }px`;
};

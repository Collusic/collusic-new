export const getSliderHandlePosition = (min: number, max: number, value: number, sliderWidth: number) => {
  const percent = (value - min) / (max - min);

  return `${sliderWidth * percent + 20}px`;
};

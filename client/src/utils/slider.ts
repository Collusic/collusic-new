export const getSliderHandlePosition = (min: number, max: number, value: number, sliderWidth: number) => {
  const percent = (value - min) / (max - min);
  return `${20 + (sliderWidth - 40) * percent}px`;
};

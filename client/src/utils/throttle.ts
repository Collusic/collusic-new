const throttle = <Params extends unknown[]>(func: (...args: Params) => unknown, delay: number) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: Params) => {
    if (timeoutId) {
      return;
    }

    timeoutId = setTimeout(() => {
      func(...args);
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }, delay);
  };
};

export default throttle;

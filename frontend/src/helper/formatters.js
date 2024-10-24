export const formatTime = (time) => {
  const padTime = (num, size) => num.toString().padStart(size, "0");

  const minutes = Math.floor(time / 60);
  const seconds = Math.ceil(time % 60);

  return `${padTime(minutes, 2)}:${padTime(seconds, 2)}`;
};

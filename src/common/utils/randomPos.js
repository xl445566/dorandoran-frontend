export const randomPos = (mapSpots) => {
  let isFinish = true;
  while (isFinish) {
    const y = Math.floor(Math.random() * 9) + 1;
    const x = Math.floor(Math.random() * 22) + 1;
    if (mapSpots[y][x] === 1) {
      isFinish = false;

      return {
        x,
        y,
      };
    }
  }
};

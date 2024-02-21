export const randomInt = (min = 1, max = 10) => {
  const number = Math.round(Math.random() * max);

  return Math.max(min, number);
};

export default {
  randomInt,
};

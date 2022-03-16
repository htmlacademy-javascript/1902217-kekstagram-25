function getRandomNumber(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const isEscPressed = (evt) => evt.key === 'Escape';

export {getRandomNumber, getRandomArrayElement, isEscPressed};

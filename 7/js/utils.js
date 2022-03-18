// Генератор случайных чисел
function getRandomNumber(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Проверка длины строки
const toCheckString = (verifiableString, maxString) => verifiableString.length <= maxString;

// Случаный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

// Нажат эскейп
const isEscPressed = (evt) => evt.key === 'Escape';

// Перехват события
const stopPropagation = (evt) => {
  evt.stopPropagation();
};

export {getRandomNumber, getRandomArrayElement, isEscPressed, toCheckString, stopPropagation};

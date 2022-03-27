// Генератор случайных чисел
function getRandomNumber(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Проверка длины строки
function toCheckString(verifiableString, maxString) {
  return verifiableString.length <= maxString;
}

// Случаный элемент массива
function getRandomArrayElement(elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

// Нажат эскейп
function isEscPressed(evt) {
  return evt.key === 'Escape';
}

// Перехват события
function stopPropagation(evt) {
  evt.stopPropagation();
}

export {getRandomNumber, getRandomArrayElement, isEscPressed, toCheckString, stopPropagation};

// Ссылка на источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min <= max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return Math.floor(Math.random() * (min - max + 1)) + max;
}

getRandomNumber ();

// Проверка длины строки комментария
const toCheckString = (verifiableString, maxString) => verifiableString <= maxString;

toCheckString();

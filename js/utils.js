import {closeBigPhoto} from './big-photo.js';
import {closeUploadPhoto} from './upload-photo.js';
import {closeUploadMessage} from './form.js';

// Таймер для сообщения
const ALERT_SHOW_TIME = 10000;
// Максимальная длина массива
const MAX_ARRAY_LENGTH = 5;
// Шаблон регулярных выражений для проверки ХешТегов
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

// Проверка длины строки
const toCheckString = (verifiableString, maxString) => verifiableString.length <= maxString;

// Нажат эскейп
const isEscPressed = (evt) => evt.key === 'Escape';

// // Закрывают окно и удаляет обработчики при нажатии на Esc
const onBigPhotoEsc = (evt) => {
  if (isEscPressed(evt)) {
    closeBigPhoto();
  }
};

const onUploadPhotoEsc = (evt) => {
  if (isEscPressed(evt) && !evt.target.matches('.text__hashtags') &&  !evt.target.matches('.text__description')) {
    closeUploadPhoto();
  }
};

const onUploadMessageEsc = (evt) => {
  if (isEscPressed(evt)) {
    closeUploadMessage();
  }
};

// // Закрывают окно и удаляет обработчики при клике мышью
const onUploadMessageMouseClick = (evt) => {
  if (evt.target.matches('.success') || evt.target.matches('.error')) {
    closeUploadMessage();
  }
};

// Находит нужный элемент из массива сравнивая id
const getItemFromCollection = (array, target) => array.find((item) => item.id === Number(target.id));

// ------------------------------Функции для валидации формы
// Функция приводит значение строки в массив в нижнем регистре
const getHashtagsArray = (string) => string.split(' ').map((item) => item.toLowerCase());

// Функция проверяет каждую строку из массива на соответствие с шаблоном регулярных выражений
const checkHashtagWriting = (array) => array.every((item) => re.test(item));

// Функиця проверяет чтобы строки из массива не повторялись
const checkHashtagRepeat = (array) => array.every((item) => array.indexOf(item) === array.lastIndexOf(item));

// Функция проверяет длину массива
const checkArrayLength = (array) => array.length <= MAX_ARRAY_LENGTH;

// Функция объединяющая все проверки валидации ХэшТег
const validateHashtags = (stringValue) => {
  const splitArray = getHashtagsArray(stringValue);
  return stringValue.length === 0 || checkHashtagWriting(splitArray) && checkHashtagRepeat(splitArray) && checkArrayLength(splitArray);
};

//Валидация длины описания фотографии
const DESCRIPTION_MAX_LENGTH = 140;
const validateDescriptionLength = (value) => toCheckString(value, DESCRIPTION_MAX_LENGTH);

// Сообщение при неудачной загрузке с сервера
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.bottom = '10';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.color = 'yellow';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'none';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Вззвращает 10 случайных элементов из массива
const getTenRandomElements = (array) => array.slice().sort(() => Math.random() - 0.5).slice(0, 10);

// Возвращает массив отсортированный по убыванию количества комментариев
const getElementsByCommentsLength = (array) => {
  const slicedArray = array.slice();
  return slicedArray.sort((a, b) => {
    if (b.comments.length > a.comments.length) {
      return 1;
    }
    if (b.comments.length < a.comments.length) {
      return -1;
    }
    return 0;
  });
};

// Функция устранения дребезга
const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscPressed, toCheckString, onBigPhotoEsc, onUploadPhotoEsc, getItemFromCollection, onUploadMessageEsc, onUploadMessageMouseClick, showAlert, validateHashtags, validateDescriptionLength, getTenRandomElements, getElementsByCommentsLength, debounce};

import {closeBigPhoto} from './big-photo.js';
import {closeUploadPhoto} from './upload-photo.js';
import {closeUploadMessage} from './form.js';

// Шаблон регулярных выражений для проверки ХешТегов
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
// Таймер для сообщения
const ALERT_SHOW_TIME = 10000;

// Генератор случайных чисел
const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

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

// // Закрывают окно и удаляет обработчики при нажатии на Esc
const onBigPhotoEsc = (evt) => {
  if (isEscPressed(evt)) {
    closeBigPhoto();
  }
};

const onUploadPhotoEsc = (evt) => {
  if (isEscPressed(evt)) {
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
const MAX_ARRAY_LENGTH = 5;
const checkArrayLength = (array) => array.length <= MAX_ARRAY_LENGTH;

// Функция объединяющая все проверки валидации ХэшТег
const validateHashtags = (stringValue) => {
  const splitArray = getHashtagsArray(stringValue);
  return stringValue.length === 0 || checkHashtagWriting(splitArray) && checkHashtagRepeat(splitArray) && checkArrayLength(splitArray);
};

//Валидация длины описания фотографии
const DESCRIPTION_MAX_LENGTH = 140;
const validateDescriptionLength = (value) => toCheckString(value, DESCRIPTION_MAX_LENGTH);


// -----------------------Функции блокирования и разблокирования кнопок отправки
const blockSubmitButton = (button) => {
  button.disabled = true;
};

const unblockSubmitButton = (button) => {
  button.disabled = false;
};

// Сообщение при неудачной загрузке с сервера
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.bottom = 10;
  alertContainer.style.right = 0;
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

export {getRandomNumber, getRandomArrayElement, isEscPressed, toCheckString, stopPropagation, onBigPhotoEsc, onUploadPhotoEsc, getItemFromCollection, onUploadMessageEsc, onUploadMessageMouseClick, showAlert, validateHashtags, validateDescriptionLength, blockSubmitButton, unblockSubmitButton};

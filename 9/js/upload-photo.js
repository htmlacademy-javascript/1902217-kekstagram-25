import {body} from './big-photo-popup.js';
import {isEscPressed, toCheckString, stopPropagation} from './utils.js';
import {scaleControlsFieldset, onScaleControlsClick} from './scale.js';
import {effectsList, onEffectsListClick} from './filter.js';


// -------------Переменные
const uploadButton = document.querySelector('#upload-file');
const uploadPopup = document.querySelector('.img-upload__overlay');
const uploadPopupCloseButton = uploadPopup.querySelector('#upload-cancel');
const uploadPhotoForm = document.querySelector('.img-upload__form');
const hashtagsOfPhoto = uploadPhotoForm.querySelector('.text__hashtags');
const descriptionOfPhoto = uploadPhotoForm.querySelector('.text__description');

// -------------Функции открытия и закрытия окна редактирования фото для загрузки

// Функция для закрытия окна при нажатии на Escape
function onUploadPopupEscKeydown(evt) {
  if (isEscPressed(evt)) {
    closeUploadPopup();
  }
}

// Функция которая открывает модальное окно
function openUploadPopup() {
  uploadPopup.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadPhotoForm.addEventListener('keydown', stopPropagation);
  document.addEventListener('keydown', onUploadPopupEscKeydown);
  uploadPopupCloseButton.addEventListener('click', closeUploadPopup);
  scaleControlsFieldset.addEventListener('click', onScaleControlsClick);
  effectsList.addEventListener('change', onEffectsListClick);
  uploadPhotoForm.addEventListener('submit', toValidate);
}

// Функция которая закрывает модальное окно
function closeUploadPopup() {
  uploadPopup.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadPhotoForm.removeEventListener('keydown', stopPropagation);
  uploadButton.value = '';
  hashtagsOfPhoto.value = '';
  descriptionOfPhoto.value = '';
  document.removeEventListener('keydown', onUploadPopupEscKeydown);
  uploadPopupCloseButton.removeEventListener('click', closeUploadPopup);
  scaleControlsFieldset.removeEventListener('click', onScaleControlsClick);
  uploadPhotoForm.removeEventListener('submit', toValidate);
}

// -------------Валидация формы

// Настраиваем библиотеку Pristine
const pristine = new Pristine(uploadPhotoForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__text-error'
}, true);

// -------------------------Валидация ХэшТега

// Шаблон регулярных выражений для проверки ХешТегов
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

// Функция приводит значение строки в массив в нижнем регистре
function getHashtagsArray(string) {
  return string.split(' ').map((item) => item.toLowerCase());
}

// Функция проверяет каждую строку из массива на соответствие с шаблоном регулярных выражений
function checkHashtagWriting(array) {
  return array.every((item) => re.test(item));
}

// Функиця проверяет чтобы строки из массива не повторялись
function checkHashtagRepaet(array) {
  return array.every((item) => array.indexOf(item) === array.lastIndexOf(item));
}

// Функция проверяет длину массива
function checkArrayLength(array) {
  return array.length <= 5;
}

// Функция объединяющая все проверки валидации ХэшТега
function validateHashtags(stringValue) {
  const splitArray = getHashtagsArray(stringValue);
  return checkHashtagWriting(splitArray) && checkHashtagRepaet(splitArray) && checkArrayLength(splitArray);
}

// Вешаем валидатор ХэшТега
pristine.addValidator(hashtagsOfPhoto,
  validateHashtags,
  'ХэшТег не соответствует требованиям'
);

// Валидация длины описания фотографии
const DESCRIPTION_MAX_LENGTH = 140;
function validateDescriptionLength(value) {
  return toCheckString(value, DESCRIPTION_MAX_LENGTH);
}
pristine.addValidator(descriptionOfPhoto,
  validateDescriptionLength,
  'Максимальная длина 140 символов'
);

// Функция валидации пристин для обработчика
function toValidate (evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
  pristine.validate();
}


// -------------Вешаю обработчик на кнопку загрузки фото
uploadButton.addEventListener('change', openUploadPopup);

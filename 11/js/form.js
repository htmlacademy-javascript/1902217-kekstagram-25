import {sendData} from './api.js';
import {validateHashtags, validateDescriptionLength, onUploadMessageEsc, onUploadMessageMouseClick} from './utils.js';
import {body} from './big-photo.js';
import {closeUploadPhoto} from './upload-photo.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const photoHashtags = uploadPhotoForm.querySelector('.text__hashtags');
const photoDescription = uploadPhotoForm.querySelector('.text__description');
const formSubmitButton = document.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const success = '.success';
const error = '.error';

// -------------Валидация формы

// Настраиваем библиотеку Pristine
const pristine = window.Pristine(uploadPhotoForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__text-error'
}, true);

// Валидатор ХэшТега
pristine.addValidator(photoHashtags,
  validateHashtags,
  'ХэшТег не соответствует требованиям'
);
// Валидатор описания
pristine.addValidator(photoDescription,
  validateDescriptionLength,
  'Максимальная длина 140 символов'
);

// Удаляет сообщение и обработчики
const closeUploadMessage = () => {
  body.lastChild.remove();
  document.removeEventListener('keydown', onUploadMessageEsc);
  window.removeEventListener('click', onUploadMessageMouseClick);
};

// Создает сообщение  и вешает обработчики
const showUploadMessage = (template, className) => {
  closeUploadPhoto();
  formSubmitButton.disabled = false;
  const messageBody = template.cloneNode(true);
  const messageButton = messageBody.querySelector(`${className}__button`);
  messageButton.addEventListener('click', closeUploadMessage);
  body.append(messageBody);
  document.addEventListener('keydown', onUploadMessageEsc);
  window.addEventListener('click', onUploadMessageMouseClick);
};

// Сообщение об успешной загрузке фотографии
const succesMessage = () => showUploadMessage(successTemplate, success);
// Сообщение об ошибке загрузки фотографии
const errorMessage = () => showUploadMessage(errorTemplate, error);

// Функция отправки формы
const setUserFormSubmit = (url) => {
  uploadPhotoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      formSubmitButton.disabled = true;
      sendData(url, succesMessage, errorMessage, new FormData(evt.target));
    }
  });
};

export {photoHashtags, photoDescription, closeUploadMessage, setUserFormSubmit};

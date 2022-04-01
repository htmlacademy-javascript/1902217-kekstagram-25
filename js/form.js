import {sendData} from './api.js';
import {validateHashtags, validateDescriptionLength, onUploadMessageEsc, onUploadMessageMouseClick, blockSubmitButton, unblockSubmitButton} from './utils.js';
import {body} from './nodes.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const photoHashtags = uploadPhotoForm.querySelector('.text__hashtags');
const photoDescription = uploadPhotoForm.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const success = '.success';
const error = '.error';

// -------------Валидация формы

// Настраиваем библиотеку Pristine
const pristine = new Pristine(uploadPhotoForm, {
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

// Создает сообщение об ошибке либо об успехе и вешает обработчики
const showUploadMessage = (template, className) => {
  const messageBody = template.cloneNode(true);
  const messageButton = messageBody.querySelector(`${className}__button`);
  messageButton.addEventListener('click', closeUploadMessage);
  body.append(messageBody);
  document.addEventListener('keydown', onUploadMessageEsc);
  window.addEventListener('click', onUploadMessageMouseClick);
};

// Функция отправки формы
const setUserFormSubmit = (onSucces) => {
  uploadPhotoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton(submitButton);
      sendData(
        () => {
          onSucces();
          unblockSubmitButton(submitButton);
          showUploadMessage(successTemplate, success);
        },
        () => {
          onSucces();
          unblockSubmitButton(submitButton);
          showUploadMessage(errorTemplate, error);
        },
        new FormData(evt.target)
      );
    }
  });
};

export {uploadPhotoForm, photoHashtags, photoDescription, setUserFormSubmit, closeUploadMessage};

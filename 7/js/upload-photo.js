import {body} from './big-photo-popup.js';
import {isEscPressed} from './utils.js';

// -------------Переменные
const uploadButton = document.querySelector('#upload-file');
const uploadPopup = document.querySelector('.img-upload__overlay');
const uploadPopupCloseButton = uploadPopup.querySelector('#upload-cancel');
const uploadPhotoForm = document.querySelector('.img-upload__form');

// -------------Функции открытия и закрытия окна редактирования фото для загрузки
const onUploadPopupEscKeydown = (evt) => {
  if (isEscPressed(evt)) {
    evt.preventDefault();
    closeUploadPopup();
  }
};

const openUploadPopup = () => {
  uploadPopup.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadPopupEscKeydown);
  uploadPopupCloseButton.addEventListener('click', closeUploadPopup);
};

function closeUploadPopup () {
  uploadPopup.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onUploadPopupEscKeydown);
  uploadPopupCloseButton.removeEventListener('click', closeUploadPopup);
}

// -------------Вешаю обработчик на кнопку загрузки фото
uploadButton.addEventListener('change', openUploadPopup);


// -------------Валидация формы
// const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;  шаблон для проверки хештегов
const pristine = new Pristine(uploadPhotoForm);

uploadPhotoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

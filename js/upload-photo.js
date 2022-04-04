import {body} from './big-photo.js';
import {onUploadPhotoEsc} from './utils.js';
import {scaleControlsFieldset, onScaleControlsClick} from './scale.js';
import {effectsList, onEffectsListClick} from './effects.js';
import {photoHashtags, photoDescription} from './form.js';

const uploadButton = document.querySelector('#upload-file');
const uploadPhoto = document.querySelector('.img-upload__overlay');
const uploadPhotoCloseButton = uploadPhoto.querySelector('#upload-cancel');

// Функция которая закрывает модальное окно
const closeUploadPhoto = () => {
  uploadPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadButton.value = '';
  photoHashtags.value = '';
  photoDescription.value = '';
  document.removeEventListener('keydown', onUploadPhotoEsc);
  uploadPhotoCloseButton.removeEventListener('click', closeUploadPhoto);
  scaleControlsFieldset.removeEventListener('click', onScaleControlsClick);
};

// Функция которая открывает модальное окно
const openUploadPhoto = () => {
  uploadPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadPhotoEsc);
  uploadPhotoCloseButton.addEventListener('click', closeUploadPhoto);
  scaleControlsFieldset.addEventListener('click', onScaleControlsClick);
  effectsList.addEventListener('change', onEffectsListClick);
};

// Обработчик события при клике по кнопке загрузки фото
uploadButton.addEventListener('change', openUploadPhoto);

export {closeUploadPhoto};

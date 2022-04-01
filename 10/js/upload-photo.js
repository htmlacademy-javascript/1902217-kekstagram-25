import {body} from './nodes.js';
import {stopPropagation, onUploadPhotoEsc} from './utils.js';
import {scaleControlsFieldset, onScaleControlsClick} from './scale.js';
import {effectsList, onEffectsListClick} from './filter.js';
import {uploadPhotoForm, photoHashtags, photoDescription} from './form.js';


// -------------Переменные
const uploadButton = document.querySelector('#upload-file');
const uploadPhoto = document.querySelector('.img-upload__overlay');
const uploadPhotoCloseButton = uploadPhoto.querySelector('#upload-cancel');


// Функция которая закрывает модальное окно
const closeUploadPhoto = () => {
  uploadPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadPhotoForm.removeEventListener('keydown', stopPropagation);
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
  uploadPhotoForm.addEventListener('keydown', stopPropagation);
  document.addEventListener('keydown', onUploadPhotoEsc);
  uploadPhotoCloseButton.addEventListener('click', closeUploadPhoto);
  scaleControlsFieldset.addEventListener('click', onScaleControlsClick);
  effectsList.addEventListener('change', onEffectsListClick);
};

// -------------Вешаю обработчик на кнопку загрузки фото
uploadButton.addEventListener('change', openUploadPhoto);


export {closeUploadPhoto};

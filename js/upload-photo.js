import {body} from './big-photo.js';
import {onUploadPhotoEsc} from './utils.js';
import {scaleControlsFieldset, onScaleControlsClick} from './scale.js';
import {effectsList, onEffectsListClick} from './effects.js';
import {photoHashtags, photoDescription} from './form.js';

const uploadFileChooser = document.querySelector('#upload-file');
const uploadPhotoPreview = document.querySelector('#img-upload__preview-picture');
const uploadPhoto = document.querySelector('.img-upload__overlay');
const uploadPhotoCloseButton = uploadPhoto.querySelector('#upload-cancel');
const APPROVED_FILES = ['jpg', 'jpeg', 'png'];

// Функция которая закрывает модальное окно
const closeUploadPhoto = () => {
  uploadPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFileChooser.value = '';
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

const onUploadFileChooserClick = () => {
  const uploadFile = uploadFileChooser.files[0];
  const uploadFileName = uploadFile.name.toLowerCase();

  const matches = APPROVED_FILES.some((it) => uploadFileName.endsWith(it));
  if (matches) {
    uploadPhotoPreview.src = URL.createObjectURL(uploadFile);
    openUploadPhoto();
  }
};

// Обработчик события при клике по кнопке загрузки фото
uploadFileChooser.addEventListener('change', onUploadFileChooserClick);

export {closeUploadPhoto};

import {addUsersPhotos, collectionOfPhotos} from './mock.js';
import {onPopupClick} from './big-photo-popup.js';
import './upload-photo.js';

// -------------Добавляет коллекцию фото на страницу
addUsersPhotos(collectionOfPhotos);

// -------------Реализация полноразмерного фото
const wrapperOfPhotos = document.querySelector('.pictures');
wrapperOfPhotos.addEventListener('click', onPopupClick);

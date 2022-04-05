import {addUsersPhotos} from './add-photos.js';
import {setUserFormSubmit} from './form.js';
import {showAlert, debounce} from './utils.js';
import './upload-photo.js';
import  {onBigPhotoClick} from './big-photo.js';
import {getData} from './api.js';
import {addFilters} from './filter.js';

// URL сервера
const urlKekstagramDataGet = 'https://25.javascript.pages.academy/kekstagram/data';
const urlKekstagramDataSend = 'https://25.javascript.pages.academy/kekstagram';

// Задержка между переключением фильтров
const FILTER_RENDER_DELAY = 500;

// Функции добавления фото на сайт и рендера большого фото, а также фильтр используют данные полученные с сервера
getData(
  urlKekstagramDataGet,
  (data) => {
    addUsersPhotos(data);
    onBigPhotoClick(data);
    addFilters(data, debounce(addUsersPhotos, FILTER_RENDER_DELAY));
  },
  () => showAlert('Не удалось загрузить данные с сервера. Попробуйте обновить страницу!')
);

// Функция отправляет форму с фотографией и описанием
setUserFormSubmit(urlKekstagramDataSend);

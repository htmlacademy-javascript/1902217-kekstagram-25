import {collectionOfPhotos} from './mock.js';
import {isEscPressed} from './utils.js';

const bigPhoto = document.querySelector('.big-picture');
const bigPhotoImage = bigPhoto.querySelector('.big-picture__img').querySelector('img');
const bigPhotoLikesCount = bigPhoto.querySelector('.likes-count');
const bigPhotoCommentsCount = bigPhoto.querySelector('.comments-count');
const bigPhotoDescription = bigPhoto.querySelector('.social__caption');
const body = document.querySelector('body');
const popupCloseButton = bigPhoto.querySelector('.big-picture__cancel');
const popupComments = bigPhoto.querySelector('.social__comments');
const popupCommentClone = popupComments.querySelector('.social__comment').cloneNode(true);
const commentsLoaderButton = bigPhoto.querySelector('.social__comments-loader');
const commentsShownCount = document.querySelector('.comments-show');

// ----------Функция рендера большого фото
const renderPopup = ({ url, likes, comments, description }) => {
  bigPhotoImage.src = url;
  bigPhotoLikesCount.textContent = likes;
  bigPhotoCommentsCount.textContent = comments.length;
  bigPhotoDescription.textContent = description;
};

// Переменные для функций комментариев
let commentsArray = [];
const COMMENTS_LIMIT = 5;

// Функция рендера комментариев и их размещение под фото
const renderComments = (array) => {
  array.forEach(({ avatar, message, name }) => {
    const popupComment = popupCommentClone.cloneNode(true);
    const author = popupComment.querySelector('.social__picture');
    const commentText = popupComment.querySelector('.social__text');
    author.src = avatar;
    author.alt = name;
    commentText.textContent = message;
    popupComments.appendChild(popupComment);
  });
};

// Добавляет комментарии по 5 шт, также выводит количество показанных комментариев в поле
const onLoadButtonClick = () => {
  if (commentsArray.length <= COMMENTS_LIMIT) {
    commentsLoaderButton.classList.add('hidden');
  }
  renderComments(commentsArray.splice(0, COMMENTS_LIMIT));
  const commentsCount = document.querySelectorAll('.social__comment');
  commentsShownCount.textContent = commentsCount.length;
};

// Закрывает окно и удаляет обработчики при нажатии на Esc на большом фото
const onPopupEscKeydown = (evt) => {
  if (isEscPressed(evt)) {
    closePopup();
  }
};

// // Функция для закрытия большого фото
const closePopup = () => {
  document.removeEventListener('keydown', onPopupEscKeydown);
  popupCloseButton.removeEventListener('click', closePopup);
  body.classList.remove('modal-open');
  bigPhoto.classList.add('hidden');
  commentsArray = [];
  commentsLoaderButton.removeEventListener('click', onLoadButtonClick);
};

// // Функция для открытия большого фото
const openPopup = (item) => {
  document.addEventListener('keydown', onPopupEscKeydown);
  popupCloseButton.addEventListener('click', closePopup);
  body.classList.add('modal-open');
  bigPhoto.classList.remove('hidden');
  renderPopup(item);
  popupComments.innerHTML = '';
  commentsArray = item.comments.slice();
  renderComments(commentsArray.splice(0, COMMENTS_LIMIT));
  if (item.comments.length <= COMMENTS_LIMIT) {
    commentsLoaderButton.classList.add('hidden');
    commentsLoaderButton.removeEventListener('click', onLoadButtonClick);
  } else {
    commentsLoaderButton.classList.remove('hidden');
    commentsLoaderButton.addEventListener('click', onLoadButtonClick);
  }
};

// // Функция обработчика клика по контейнеру с маленькими фото
const onPopupClick = (evt) => {
  if (evt.target.matches('.picture__img')) {
    const target = evt.target.closest('.picture');
    const itemFromCollection = collectionOfPhotos.find((item) => item.id === Number(target.id));
    openPopup(itemFromCollection);
  }
};

// -------------Вешаею обработчик клика на контейнер с маленькими фотками
const wrapperOfPhotos = document.querySelector('.pictures');
wrapperOfPhotos.addEventListener('click', onPopupClick);


export {body, closePopup};

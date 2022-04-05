import {onBigPhotoEsc, getItemFromCollection} from './utils.js';

const body = document.querySelector('body');
const wrapperOfPhotos = document.querySelector('.pictures');
const bigPhoto = document.querySelector('.big-picture');
const bigPhotoImage = bigPhoto.querySelector('.big-picture__img').querySelector('img');
const bigPhotoLikesCount = bigPhoto.querySelector('.likes-count');
const bigPhotoComments = bigPhoto.querySelector('.social__comments');
const bigPhotoCommentClone = bigPhotoComments.querySelector('.social__comment').cloneNode(true);
const bigPhotoCommentsCount = bigPhoto.querySelector('.comments-count');
const bigPhotoDescription = bigPhoto.querySelector('.social__caption');
const closeButton = bigPhoto.querySelector('.big-picture__cancel');
const commentsLoaderButton = bigPhoto.querySelector('.social__comments-loader');
const commentsShownCount = document.querySelector('.comments-show');

// Переменные для функций комментариев
let clonedComments = [];
let addedComments = [];
const COMMENTS_LIMIT = 5;

// ----------Функция рендера большого фото
const renderBigPhoto = ({ url, likes, comments, description }) => {
  bigPhotoImage.src = url;
  bigPhotoLikesCount.textContent = likes;
  bigPhotoCommentsCount.textContent = comments.length;
  bigPhotoDescription.textContent = description;
};

// Функция рендера комментариев и их размещение под фото
const renderComments = (array) => {
  array.forEach(({ avatar, message, name }) => {
    const popupComment = bigPhotoCommentClone.cloneNode(true);
    const author = popupComment.querySelector('.social__picture');
    const commentText = popupComment.querySelector('.social__text');
    author.src = avatar;
    author.alt = name;
    commentText.textContent = message;
    bigPhotoComments.appendChild(popupComment);
  });
};

// Добавляет комментарии по 5 шт, также выводит количество показанных комментариев в поле
const onLoadButtonClick = () => {
  if (clonedComments.length <= COMMENTS_LIMIT) {
    commentsLoaderButton.classList.add('hidden');
  }
  renderComments(clonedComments.splice(0, COMMENTS_LIMIT));
  const commentsCount = document.querySelectorAll('.social__comment');
  commentsShownCount.textContent = commentsCount.length;
};

// // Функция для закрытия большого фото
const closeBigPhoto = () => {
  document.removeEventListener('keydown', onBigPhotoEsc);
  closeButton.removeEventListener('click', closeBigPhoto);
  body.classList.remove('modal-open');
  bigPhoto.classList.add('hidden');
  clonedComments = [];
  commentsLoaderButton.removeEventListener('click', onLoadButtonClick);
};

// // Функция для открытия большого фото
const openBigPhoto = (item) => {
  document.addEventListener('keydown', onBigPhotoEsc);
  closeButton.addEventListener('click', closeBigPhoto);
  body.classList.add('modal-open');
  bigPhoto.classList.remove('hidden');
  renderBigPhoto(item);
  bigPhotoComments.innerHTML = '';
  clonedComments = item.comments.slice();
  addedComments = clonedComments.splice(0, COMMENTS_LIMIT);
  commentsShownCount.textContent = addedComments.length;
  renderComments(addedComments);
  if (item.comments.length <= COMMENTS_LIMIT) {
    commentsLoaderButton.classList.add('hidden');
    commentsLoaderButton.removeEventListener('click', onLoadButtonClick);
  } else {
    commentsLoaderButton.classList.remove('hidden');
    commentsLoaderButton.addEventListener('click', onLoadButtonClick);
  }
};

const onBigPhotoClick = (array) => {
  wrapperOfPhotos.addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) {
      evt.preventDefault();
      const target = evt.target.closest('.picture');
      openBigPhoto(getItemFromCollection(array, target));
    }
  });
};

export {closeBigPhoto, onBigPhotoClick, body};

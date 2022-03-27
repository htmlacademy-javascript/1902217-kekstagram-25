import {isEscPressed} from './utils.js';
import {collectionOfPhotos} from './mock.js';

const bigPhoto = document.querySelector('.big-picture');
const body = document.querySelector('body');
const popupCloseButton = bigPhoto.querySelector('.big-picture__cancel');
const popupComments = bigPhoto.querySelector('.social__comments');
const popupCommentClone = popupComments.querySelector('.social__comment').cloneNode(true);
const commentsLoaderButton = bigPhoto.querySelector('.social__comments-loader');
const commentsShownCount = document.querySelector('.comments-show');

// ----------Функция рендера большого фото
const renderPopup = ({url, likes, comments, description}) => {
  bigPhoto.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPhoto.querySelector('.likes-count').textContent = likes;
  bigPhoto.querySelector('.comments-count').textContent = comments.length;
  bigPhoto.querySelector('.social__caption').textContent = description;
};

// Переменные для функций комментариев
let commentsArray = [];
const COMMENTS_LIMIT = 5;

// Функция рендера комментариев и их размещение под фото
function renderComments(item) {
  item.forEach(({ avatar, message, name }) => {
    const popupComment = popupCommentClone.cloneNode(true);
    const author = popupComment.querySelector('.social__picture');
    const commentText = popupComment.querySelector('.social__text');
    author.src = avatar;
    author.alt = name;
    commentText.textContent = message;
    popupComments.appendChild(popupComment);
  });
}

// Показывает кнопку Загрузить еще, и вешает обработчик добавления комментов
function showLoadButton() {
  commentsLoaderButton.classList.remove('hidden');
  commentsLoaderButton.addEventListener('click', onLoadButtonClick);
}

// Скрывает кнопку Загрузить еще, и удаляет обработчик добавления комментов
function hideLoadButton () {
  commentsLoaderButton.classList.add('hidden');
  commentsLoaderButton.removeEventListener('click', onLoadButtonClick);
}

// Добавляет комментарии по 5 шт, также выводит количество показанных комментариев в поле
function onLoadButtonClick () {
  if (commentsArray.length <= COMMENTS_LIMIT) {
    hideLoadButton();
  }
  renderComments(commentsArray.splice(0, COMMENTS_LIMIT));
  const commentsCount = document.querySelectorAll('.social__comment');
  commentsShownCount.textContent = commentsCount.length;
}

// // Закрывает окно и удаляет обработчики при нажатии на Esc на большом фото
function onPopupEscKeydown(evt) {
  if (isEscPressed(evt)) {
    closePopup();
  }
}

// // Функция для открытия большого фото
function openPopup(item) {
  document.addEventListener('keydown', onPopupEscKeydown);
  popupCloseButton.addEventListener('click', closePopup);
  body.classList.add('modal-open');
  bigPhoto.classList.remove('hidden');
  renderPopup(item);
  popupComments.innerHTML = '';
  commentsArray = item.comments.slice();
  renderComments(commentsArray.splice(0, COMMENTS_LIMIT));
  // eslint-disable-next-line no-unused-expressions
  (item.comments.length <= COMMENTS_LIMIT) ? hideLoadButton() : showLoadButton();
}

// // Функция для закрытия большого фото
function closePopup () {
  document.removeEventListener('keydown', onPopupEscKeydown);
  popupCloseButton.removeEventListener('click', closePopup);
  body.classList.remove('modal-open');
  bigPhoto.classList.add('hidden');
  hideLoadButton();
  commentsArray = [];
}

// // Функция обработчика клика по контейнеру с маленькими фото
function onPopupClick(evt) {
  if (evt.target.matches('.picture__img')) {
    const target = evt.target.closest('.picture');
    const itemFromCollection = collectionOfPhotos.find((item) => item.id === Number(target.id));
    openPopup(itemFromCollection);
  }
}

// -------------Вешаею обработчик клика на контейнер с маленькими фотками
const wrapperOfPhotos = document.querySelector('.pictures');
wrapperOfPhotos.addEventListener('click', onPopupClick);


export {body};

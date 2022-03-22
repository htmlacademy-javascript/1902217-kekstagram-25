import {isEscPressed} from './utils.js';
import {collectionOfPhotos} from './mock.js';

const popup = document.querySelector('.big-picture');
const body = document.querySelector('body');
const popupCloseButton = popup.querySelector('.big-picture__cancel');
const popupComments = popup.querySelector('.social__comments');
const popupCommentClone = popupComments.querySelector('.social__comment').cloneNode(true);
const commentsLoaderButton = popup.querySelector('.social__comments-loader');

// ----------Функция рендера большого фото
const renderPopup = ({url, likes, comments, description}) => {
  popup.querySelector('.big-picture__img').querySelector('img').src = url;
  popup.querySelector('.likes-count').textContent = likes;
  popup.querySelector('.comments-count').textContent = comments.length;
  popup.querySelector('.social__caption').textContent = description;
};

// Переменные для функций комментариев
let commentsArray = [];
const COMMENTS_LIMIT = 5;

// Функция рендера комментариев и их размещение под фото
const renderComments = (item) => {
  item.forEach(({ avatar, message, name }) => {
    const popupComment = popupCommentClone.cloneNode(true);
    const author = popupComment.querySelector('.social__picture');
    const commentText = popupComment.querySelector('.social__text');
    author.src = avatar;
    author.alt = name;
    commentText.textContent = message;
    popupComments.appendChild(popupComment);
  });
};

// Подставляет кол-во показанных комментариев в нужное поле
const getCommentsCount = () => {
  const commentsShowCount = document.querySelector('.comments-show');
  const commentsCount = document.querySelectorAll('.social__comment');
  commentsShowCount.textContent = commentsCount.length;
};

// Показывает кнопку Загрузить еще, и вешает обработчик добавления комментов
const toShowLoadButton=  () => {
  commentsLoaderButton.classList.remove('hidden');
  commentsLoaderButton.addEventListener('click', onUploadButtonClick);
};

// Скрывает кнопку Загрузить еще, и удаляет обработчик добавления комментов
function toHideLoadButton () {
  commentsLoaderButton.classList.add('hidden');
  commentsLoaderButton.removeEventListener('click', onUploadButtonClick);
}

// Добавляет комментарии по 5 шт, также выводит количество показанных комментариев в поле
function onUploadButtonClick () {
  if (commentsArray.length <= COMMENTS_LIMIT) {
    toHideLoadButton();
  }
  renderComments(commentsArray.splice(0, COMMENTS_LIMIT));
  getCommentsCount();
}

// // Закрывает окно и удаляет обработчики при нажатии на Esc на большом фото
const onPopupEscKeydown = (evt) => {
  if (isEscPressed(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

// // Функция для открытия большого фото
const openPopup = (item) => {
  document.addEventListener('keydown', onPopupEscKeydown);
  popupCloseButton.addEventListener('click', closePopup);
  body.classList.add('modal-open');
  popup.classList.remove('hidden');
  renderPopup(item);
  popupComments.innerHTML = '';
  commentsArray = item.comments.slice();
  renderComments(commentsArray.splice(0, COMMENTS_LIMIT));
  if (item.comments.length <= COMMENTS_LIMIT) {
    toHideLoadButton();
  } else {
    toShowLoadButton();
  }
};

// // Функция для закрытия большого фото
function closePopup () {
  document.removeEventListener('keydown', onPopupEscKeydown);
  popupCloseButton.removeEventListener('click', closePopup);
  body.classList.remove('modal-open');
  popup.classList.add('hidden');
  toHideLoadButton();
  commentsArray = [];
}

// // Функция обработчика клика по контейнеру с маленькими фото
const onPopupClick = (evt) => {
  if (evt.target.matches('.picture__img')) {
    const target = evt.target.closest('.picture');
    evt.preventDefault();
    const itemFromCollection = collectionOfPhotos.find((item) => item.id === Number(target.id));
    openPopup(itemFromCollection);
  }
};

// -------------Вешаею обработчик клика на контейнер с маленькими фотками
const wrapperOfPhotos = document.querySelector('.pictures');
wrapperOfPhotos.addEventListener('click', onPopupClick);


export {body};
